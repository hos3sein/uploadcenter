module.exports = {
  apps: [
    {
      name: "approve3",
      script: "./index.js",
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: "",
      instances: 1,
      watch: true,
      max_memory_restart: "1G",
      watch_delay: 10000,
      ignore_watch: ["node_modules"],
      cron_restart: "0 0 * * *",
      // exec_mode: "cluster_mode",
      exec_mode: "cluster",
      autorestart: true,
      watch: true,
      // max_memory_restart: "200M",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],

  deploy: {
    development: {
      user: "root",
      // port: "22",
      host: "121.41.58.117",
      ref: "origin/main",
      repo: "git@gitlab.com:alisalhi3535/approve3.git",
      path: "/root/microService/ash3/approve",
      // "post-deploy": "pm2 reload ecosystem.config.js --env development",
      "post-deploy":
        "npm install && pm2 startOrRestart ecosystem.config.js --env development",
    },
    production: {
      user: "root",
      // port: "22",
      host: "121.41.58.117",
      ref: "origin/main",
      repo: "git@gitlab.com:alisalhi3535/approve3.git",
      path: "/root/microService/ash3/approve",
      // "post-deploy": "pm2 reload ecosystem.config.js --env development",
      "post-deploy":
        "npm install && pm2 startOrRestart ecosystem.config.js --env production",
    },
  },
};
