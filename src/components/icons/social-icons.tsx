import type { SVGProps } from "react";

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14 9.5V7.8c0-.8.5-1 1-1h2V3.9L14 3.9c-2.7 0-3.5 2-3.5 3.6v2h-2v3h2V21h3v-9.5h2.4l.4-3H13.5c-.2 0 .5 0 .5-1z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="16.8" cy="7.2" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.5 3c.3 1.9 1.5 3.3 3.5 3.6v2.7c-1.3.1-2.5-.3-3.5-1v6.4c0 3-2.4 5.3-5.4 5.3-3 0-5.3-2.4-5.3-5.4 0-3 2.5-5.4 5.5-5.3v2.8c-1.4-.2-2.7.9-2.7 2.4 0 1.4 1.1 2.5 2.5 2.5 1.5 0 2.7-1.2 2.7-2.7V3h2.7z" />
    </svg>
  );
}
