var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'express-postresql'
    },
    port: process.env.PORT || 3000,
    db: 'postgres://postgres@localhost/itec',
    omitNull: true
  },

  test: {
    root: rootPath,
    app: {
      name: 'express-postresql'
    },
    port: process.env.PORT || 3000,
    db: 'postgres://localhost/express-postresql-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'express-postresql'
    },
    port: process.env.PORT || 3000,
    db: 'postgres://localhost/express-postresql-production'
  }
};

module.exports = config[env];
