#!/usr/bin/env node
/**
 * Simple generation of 3 circular avatar placeholder PNGs for testimonials.
 * Files: auth-01.png, auth-02.png, auth-03.png
 * Output path: public/images/testimonials
 */
import { PNG } from 'pngjs';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve(process.cwd(), 'public', 'images', 'testimonials');
const SIZE = 256; // square canvas

// Distinct background + foreground color pairs (accessible contrast)
const PALETTES = [
  { bg: '#2563eb', fg: '#ffffff' }, // blue
  { bg: '#db2777', fg: '#ffffff' }, // pink
  { bg: '#059669', fg: '#ffffff' }, // emerald
];

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

function drawCircleAvatar({ index, bg, fg }) {
  const png = new PNG({ width: SIZE, height: SIZE });
  const radius = SIZE / 2;
  const center = { x: radius, y: radius };
  const bgRgb = hexToRgb(bg);
  const fgRgb = hexToRgb(fg);

  // Pre-calc initials: A, B, C (or 1,2,3). We'll just do numbers for clarity.
  const label = (index + 1).toString();

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const idx = (SIZE * y + x) << 2;
      // Distance from center
      const dx = x - center.x + 0.5;
      const dy = y - center.y + 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= radius) {
        png.data[idx] = bgRgb.r;
        png.data[idx + 1] = bgRgb.g;
        png.data[idx + 2] = bgRgb.b;
        png.data[idx + 3] = 255;
      } else {
        // Transparent outside circle
        png.data[idx] = 0;
        png.data[idx + 1] = 0;
        png.data[idx + 2] = 0;
        png.data[idx + 3] = 0;
      }
    }
  }

  // Draw a simple numeral in the middle using a rough pixel font matrix
  // We'll map a 5x7 pattern scaled up.
  const FONT = {
    '1': [
      '00100',
      '01100',
      '00100',
      '00100',
      '00100',
      '00100',
      '01110',
    ],
    '2': [
      '01110',
      '10001',
      '00001',
      '00010',
      '00100',
      '01000',
      '11111',
    ],
    '3': [
      '01110',
      '10001',
      '00001',
      '00110',
      '00001',
      '10001',
      '01110',
    ],
  };

  const glyph = FONT[label];
  const glyphW = 5;
  const glyphH = 7;
  const scale = 20; // 5*20 = 100 wide -> nicely inside 256 circle
  const glyphPixelW = glyphW * scale;
  const glyphPixelH = glyphH * scale;
  const startX = Math.round(center.x - glyphPixelW / 2);
  const startY = Math.round(center.y - glyphPixelH / 2);

  for (let gy = 0; gy < glyphH; gy++) {
    for (let gx = 0; gx < glyphW; gx++) {
      if (glyph[gy][gx] === '1') {
        for (let sy = 0; sy < scale; sy++) {
          for (let sx = 0; sx < scale; sx++) {
            const px = startX + gx * scale + sx;
            const py = startY + gy * scale + sy;
            if (px < 0 || py < 0 || px >= SIZE || py >= SIZE) continue;
            const idx = (SIZE * py + px) << 2;
            png.data[idx] = fgRgb.r;
            png.data[idx + 1] = fgRgb.g;
            png.data[idx + 2] = fgRgb.b;
            png.data[idx + 3] = 255;
          }
        }
      }
    }
  }

  return png;
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  await Promise.all(
    PALETTES.slice(0, 3).map((palette, i) =>
      new Promise((resolve, reject) => {
        const png = drawCircleAvatar({ index: i, ...palette });
        const fileName = `auth-0${i + 1}.png`;
        const outPath = path.join(OUTPUT_DIR, fileName);
        png
          .pack()
          .pipe(fs.createWriteStream(outPath))
          .on('finish', () => {
            console.log('Generated', outPath);
            resolve();
          })
          .on('error', reject);
      })
    )
  );
  console.log('All testimonial avatar placeholders generated.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
