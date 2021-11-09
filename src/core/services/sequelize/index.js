const { Sequelize } = require('sequelize');
const env = require('../../../config/database');
const { logger } = require('../../lib/logger');

const CounterRegister = require('../../database/models/CounterRegister');
const User = require('../../database/models/User');

module.exports.connection = () => {
  try {
    const connection = new Sequelize(env);
    CounterRegister.init(connection);
    User.init(connection);

    logger.info(':: Database has been started ::');
    return connection;
  } catch (error) {
    logger.error(':: Database return some error ::', error);
    throw error;
  }
};
