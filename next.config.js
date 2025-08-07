/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; script-src 'report-sample' 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'report-sample' 'self'; object-src 'none'; base-uri 'self'; connect-src 'self' https://api.alfiewoodland.com; font-src 'self'; frame-src 'self'; img-src 'self' https://alfiewoodlandmedia.blob.core.windows.net; manifest-src 'self'; media-src 'self'; worker-src 'none';`,
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
