import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://meet-scheduling.onrender.com/api/:path*",
      },
      {
        source: "/oauth2/:path*",
        destination:
          "https://meet-scheduling.onrender.com/oauth2/:path*",
      },
      {
        source: "/login/:path*",
        destination:
          "https://meet-scheduling.onrender.com/login/:path*",
      },
      {
        source: "/logout",
        destination:
          "https://meet-scheduling.onrender.com/logout",
      },
      {
        source: "/user",
        destination:
          "https://meet-scheduling.onrender.com/user",
      },
    ];
  },
};

export default nextConfig;