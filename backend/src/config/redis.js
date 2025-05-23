const Redis = require('ioredis');
const { REDIS_URL } = require('./index');

const redis = REDIS_URL ? new Redis(REDIS_URL) : null;

module.exports = redis;
