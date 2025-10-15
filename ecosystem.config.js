module.exports = {
  apps: [
    {
      name: "p2p",
      script: "ts-node",
      args: "packages/api/src/server.ts",
      interpreter: "node",
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
