const path = require('path');

let rootPath = path.normalize(path.join(__dirname, '/../../'));

module.exports = {
  development: {
    rootPath: rootPath,
    port: 6060
  },
  staging: {
  },
  production: {
    port: process.env.PORT
  },
  secret: 'Sometion@Secret!'
};
