
const config = require('config');

exports.dbHost = config.get('database.host');
exports.dbUser = config.get('database.user');
exports.dbPass = config.get('database.pass');
exports.dbName = config.get('database.name');
exports.dbPort = config.get('database.port');