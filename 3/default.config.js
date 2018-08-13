const fs = require('fs');

const { APP_ID, APP_SECRET, NODE_LOG_DIR, HOME, APP_DIR } = process.env;

const defaults = {
  // server: 'wss://agentserver.node.aliyun.com:8080',
  appid: `${APP_ID}`,
  secret: `${APP_SECRET}`,
  // heartbeatInterval: 60,
  // reconnectDelay: 10,
  // reportInterval: 60,
  logdir: `${NODE_LOG_DIR}`,
  error_log: [],
};

let custom = {};

if (fs.existsSync(`${APP_DIR}/agenthub.config.json`)) {
  custom = require(`${APP_DIR}/agenthub.config.json`);
}

if (fs.existsSync(`${APP_DIR}/alinode.config.json`)) {
  custom = require(`${APP_DIR}/alinode.config.json`);
}

if (!custom.appid && defaults.appid) {
  delete custom.appid;
}

if (!custom.secret && defaults.secret) {
  delete custom.secret;
}

const config = Object.assign(defaults, custom);

if (config.appid !== 'undefined' && config.secret !== 'undefined') {
  if (config.logdir === 'undefined') {
    config.logdir = '/tmp';
  }
  fs.writeFileSync(`${HOME}/agenthub-running.json`, JSON.stringify(config));
}
