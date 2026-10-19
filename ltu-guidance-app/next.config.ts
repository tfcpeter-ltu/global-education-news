import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers(){return [{source:'/:path*',headers:[{"key":"X-Content-Type-Options","value":"nosniff"},{"key":"Referrer-Policy","value":"strict-origin-when-cross-origin"},{"key":"Content-Security-Policy","value":"object-src 'none'; base-uri 'self'; upgrade-insecure-requests"}]},{source:'/api/:path*',headers:[{key:'Cache-Control',value:'no-store, private'}]}];}
};

export default nextConfig;
