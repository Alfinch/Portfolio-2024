export const MEDIA_URL =
  "https://alfiewoodlandmedia.blob.core.windows.net/media";

export const CSP = `default-src 'self';
script-src 'report-sample' 'self';
style-src 'report-sample' 'self';
object-src 'none';
base-uri 'self';
connect-src 'self' https://api.alfiewoodland.com;
font-src 'self';
frame-src 'self';
img-src 'self';
manifest-src 'self';
media-src 'self';
worker-src 'none';`;
