export function getStrapiMediaUrl(path?: string | null) {
  if (!path) return ""
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${path}?ngrok-skip-browser-warning=true`
}
