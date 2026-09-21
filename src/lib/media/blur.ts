function shimmerSvg(w: number, h: number) {
  return `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="oklch(0.93 0.006 70)" offset="20%" />
      <stop stop-color="oklch(0.97 0.006 70)" offset="50%" />
      <stop stop-color="oklch(0.93 0.006 70)" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="oklch(0.93 0.006 70)" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
</svg>`;
}

export function shimmerDataUrl(w = 32, h = 32) {
  const base64 =
    typeof window === "undefined"
      ? Buffer.from(shimmerSvg(w, h)).toString("base64")
      : window.btoa(shimmerSvg(w, h));
  return `data:image/svg+xml;base64,${base64}`;
}
