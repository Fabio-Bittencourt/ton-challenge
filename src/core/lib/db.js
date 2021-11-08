const { Sequelize } = require('sequelize');
const { logger } = require('./logger');
const env = require('../../config/database');

const client = new Sequelize(env);

module.exports = {
  open: async () => {
    try {
      await client.authenticate();
      logger.info('::DB::Connect:: OPEN');
    } catch (error) {
      console.log('🚀 ~ file: db.js ~ line 13 ~ open: ~ error', error);
      logger.error('::ERROR::', error);
      throw error;
    }
  },
  close: async () => {
    try {
      await client.close();
      logger.info('::DB::Shut down::');
    } catch (error) {
      console.log('🚀 ~ file: db.js ~ line 26 ~ close: ~ error', error);
      logger.error('::ERROR::', error);
      throw error;
    }
  },
};
