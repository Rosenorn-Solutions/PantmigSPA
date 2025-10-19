"use client";
import Image from "next/image";
import Link from "next/link";
// Local minimal className combiner since '@/lib/utils' was removed
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

interface LogoProps {
  readonly className?: string;
  readonly width?: number;
  readonly height?: number;
  readonly priority?: boolean;
  readonly withLink?: boolean;
  /** If you also added PNG versions and want them preferred, set to true */
  readonly preferPng?: boolean;
  /** Optional size keyword maps to Tailwind widths; overrides width prop for layout sizing (not intrinsic image pixels) */
  readonly size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Displays the PantMig logo (light + dark variant handled via CSS).
 */
export function Logo({ className, width = 140, height = 30, priority, withLink = true, preferPng, size }: LogoProps) {
  // Decide extension based on preferPng flag; ensure the assets exist (logo-light.png / logo-dark.png)
  const ext = preferPng ? 'png' : 'svg';
  const lightSrc = `/images/logo/logo-light.${ext}`;
  const darkSrc = `/images/logo/logo-dark.${ext}`;

  const core = (
    <>
      <Image
        src={lightSrc}
        alt="PantMig logo (light)"
        width={width}
        height={height}
        priority={priority}
        className="w-full dark:hidden h-auto"
      />
      <Image
        src={darkSrc}
        alt="PantMig logo (dark)"
        width={width}
        height={height}
        priority={priority}
        className="hidden w-full dark:block h-auto"
      />
    </>
  );
  const sizeMap: Record<NonNullable<LogoProps['size']>, string> = {
    xs: 'w-20', // 80px
    sm: 'w-24', // 96px
    md: 'w-32', // 128px
    lg: 'w-40', // 160px
    xl: 'w-52', // 208px
  };
  const containerClass = cn('block', size ? sizeMap[size] : undefined, className);
  if (withLink) {
    return (
      <Link href="/" className={containerClass} aria-label="PantMig Home">
        {core}
      </Link>
    );
  }
  return <div className={containerClass}>{core}</div>;
}
export default Logo;
