module.exports = {
  apps: [
    {
      name: "p2p",
      script: "packages/api/server.js",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "development",
        PORT: 3000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
