const redis = require('redis');
const { logger } = require('../utils/logger');

const client = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

client.on('error', err => logger.error('Redis Client Error', err));
client.on('connect', () => logger.info('Redis Client Connected'));

const connectRedis = async () => {
  try {
    await client.connect();
  } catch (error) {
    logger.error('Redis connection failed:', error);
  }
};

connectRedis();

module.exports = client;