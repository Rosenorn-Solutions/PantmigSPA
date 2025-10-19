import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // Nodemailer requires Node.js runtime
export const dynamic = "force-dynamic"; // never cache

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  // honeypot field to deter bots
  company?: string;
};

function isValidEmail(email: string) {
  return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
}

function sanitize(value: unknown, maxLen = 5000) {
  if (typeof value !== "string") return "";
  // Avoid using literal control characters in source by using escape sequence
  const NULL_CHAR = /\0/g;
  const v = value.replace(NULL_CHAR, "").trim();
  return v.slice(0, maxLen);
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(
        JSON.stringify({ error: "Content-Type must be application/json" }),
        { status: 415, headers: { "content-type": "application/json" } }
      );
    }

    const body = (await req.json()) as ContactBody;

    // Bot check: hidden field should be empty
    if (body.company && body.company.length > 0) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    const name = sanitize(body.name, 200);
    const email = sanitize(body.email, 320);
    const message = sanitize(body.message, 5000);

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required." }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }
    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "Invalid email address." }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

  const to = process.env.CONTACT_TO || "pantmig@pantmig.dk";
  const from = process.env.CONTACT_FROM || `PantMig <pantmig@pantmig.dk>`;

    // Configure Nodemailer transport using SMTP env vars
  // Allow explicit overrides to avoid conflicts with OS/session env vars
  const host = (process.env.CONTACT_SMTP_HOST || process.env.SMTP_HOST) ?? undefined;
  const portRaw = process.env.CONTACT_SMTP_PORT || process.env.SMTP_PORT;
  const port = portRaw ? parseInt(portRaw) : 465;
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
    const secure = process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : port === 465; // default secure for 465
    // If using SSL (secure=true), STARTTLS does not apply, force requireTLS=false
    const requireTLS = secure ? false : process.env.SMTP_REQUIRE_TLS === "true";
  const authMethod = process.env.SMTP_AUTH_METHOD; // e.g., LOGIN, PLAIN

    if (!host || !user || !pass) {
      if (process.env.SMTP_DEBUG === "true") {
        console.warn(
          "[Contact API] SMTP environment variables are not fully set. Missing one of SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS."
        );
      }
      return new Response(
        JSON.stringify({
          error:
            "Email service is not configured. Please contact support or try again later.",
        }),
        { status: 503, headers: { "content-type": "application/json" } }
      );
    }

    const protoDebug = process.env.SMTP_PROTOCOL_DEBUG === "true";
    const baseOptions = {
      host,
      port,
      secure, // false for STARTTLS (e.g., port 587)
      requireTLS, // enforce STARTTLS if true
      auth: { user, pass },
      authMethod, // let provider pick by default; override via env when needed
      // Timeouts in ms to avoid long hangs on network issues
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
      // TLS options
      tls: {
        servername: host,
        minVersion: "TLSv1.2",
      },
      // Protocol-level debug (disabled by default)
      debug: protoDebug,
      logger: protoDebug,
    } as const;
    let transporter = nodemailer.createTransport(baseOptions);
    if (protoDebug) attachSmtpDebug(transporter);

    // Optional debug logging (no secrets) for troubleshooting
    if (process.env.SMTP_DEBUG === "true") {
      console.log("[Contact API] Using SMTP config:", {
        host,
        port,
        secure,
        requireTLS,
        authMethod,
        user: maskEmail(user || ""),
      });
    }

    const subject = `Ny kontaktbesked fra ${name}`;
    const text = `Du har modtaget en ny besked fra kontaktformularen på PantMig.dk:\n\n` +
      `Navn: ${name}\n` +
      `E-mail: ${email}\n\n` +
      `Besked:\n${message}\n`;

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2>Ny kontaktbesked</h2>
        <p><strong>Navn:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />
        <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
      </div>
    `;

    const send = async (tx: nodemailer.Transporter) =>
      tx.sendMail({
        to,
        from,
        replyTo: email,
        subject,
        text,
        html,
        envelope: { from: extractEmail(from) || user || undefined, to },
      });

    try {
      await send(transporter);
    } catch (err: unknown) {
      const e = err as any;
      const code: string | undefined = e?.code;
      const respCode: number | undefined = e?.responseCode;
      const isConnError = code === "ETIMEDOUT" || code === "ESOCKET" || code === "ECONNREFUSED" || e?.command === "CONN";
      const isAuthError = code === "EAUTH" || respCode === 535;

      if (isAuthError && !authMethod) {
        // 1) Retry forcing PLAIN
        if (process.env.SMTP_DEBUG === "true") {
          console.warn("[Contact API] AUTH failed. Retrying with AUTH PLAIN...");
        }
        transporter = nodemailer.createTransport({ ...baseOptions, authMethod: "PLAIN" });
        if (protoDebug) attachSmtpDebug(transporter);
        try {
          await send(transporter);
        } catch (e2: any) {
          const code2 = e2?.code;
          const resp2 = e2?.responseCode;
          if (code2 === "EAUTH" || resp2 === 535) {
            // 2) Retry forcing LOGIN
            if (process.env.SMTP_DEBUG === "true") {
              console.warn("[Contact API] AUTH PLAIN failed. Retrying with AUTH LOGIN...");
            }
            transporter = nodemailer.createTransport({ ...baseOptions, authMethod: "LOGIN" });
            if (protoDebug) attachSmtpDebug(transporter);
            await send(transporter);
          } else {
            throw e2;
          }
        }
      } else if (isConnError) {
        // Retry with SSL on 465
        if (process.env.SMTP_DEBUG === "true") {
          console.warn("[Contact API] Primary SMTP connection failed (STARTTLS). Retrying on 465/SSL...");
        }
        transporter = nodemailer.createTransport({
          ...baseOptions,
          port: 465,
          secure: true,
          requireTLS: false,
        });
        if (protoDebug) attachSmtpDebug(transporter);
        await send(transporter);
      } else {
        throw err;
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error: unknown) {
    if (process.env.SMTP_DEBUG === "true") {
      console.error("[Contact API] Error while sending contact email:", error);
    }
    return new Response(
      JSON.stringify({ error: "Failed to send message. Please try again later." }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!domain) return "***";
  const shown = local.length <= 2 ? local : local.slice(0, 2) + "***";
  return `${shown}@${domain}`;
}

function extractEmail(input: string): string | null {
  // Handles formats like "Name <user@example.com>" or just "user@example.com"
  const re = /<([^>]+)>/;
  const m = re.exec(input);
  if (m?.[1]) return m[1];
  return /@/.test(input) ? input : null;
}

function attachSmtpDebug(transporter: nodemailer.Transporter) {
  // Redact sensitive AUTH payloads from logs
  const redact = (s: string) =>
    s.replace(/AUTH\s+(PLAIN|LOGIN)\s+[A-Za-z0-9+/=]+/gi, "AUTH ***redacted***")
     .replace(/\bPASS\b.*/gi, "PASS ***redacted***");

  transporter.on("log", (info) => {
    try {
      const msg = typeof info?.message === "string" ? info.message : JSON.stringify(info);
      console.log("[SMTP]", redact(msg));
    } catch {
      // ignore
    }
  });
}
