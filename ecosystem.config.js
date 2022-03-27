module.exports = {
  apps: [
    {
      name: 'knockknock_api_local',
      script: 'dist/main.js',
      max_memory_restart: '512M',
      exec_mode: 'cluster'
    },
  ],
};
