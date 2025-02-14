export default function toQueryString(params: Record<string, any>): string {
  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null) // Remove undefined e null
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");

  return query ? `?${query}` : "";
}