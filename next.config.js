const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  env: {
    URL_SERVER: "http://103.1.237.48:9090",// "https://dev.airagent.vn",
    URL_API: {
      AUTH: {
        POST_LOGIN: '/auth/api/v1/auth/login'
      },
    },
    TAG_TYPES: '[]'
  },
  // Cấu hình trỏ về home khi vào link bằng domain
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};
