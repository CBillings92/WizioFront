var _ = require("lodash");

var config = {
  local: "local", //local
  alpha: "alpha", //alpha-api
  prod: "prod", //frontbeta cause that makes sense
  port: process.env.PORT || 4000
};

process.env.NODE_ENV = process.env.NODE_ENV || "local";
config.env = process.env.NODE_ENV;

var envConfig;

try {
  envConfig = require(__dirname + "/" + config[config.env]);
  // envConfig = require(__dirname + '/production');
  envConfig = envConfig || {};
} catch (e) {
  envConfig = {};
}

module.exports = _.merge(config, envConfig);
