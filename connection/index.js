
const config = require('config');

const dbHost = config.get('database.host');
const apiKey = config.get('api_key');

console.log(dbHost);