const { logger } = require('../../../core/lib/logger');
const { connection } = require('../../../core/services/sequelize');
const { get } = require('../controller');

module.exports.handler = async (event) => {
  const { url } = event.queryStringParameters;

  logger.info('::Lambda Access Counter has been started::');
  try {
    connection();
    const result = await get(url);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    logger.error('::Lambda Access Counter return a Error::', error);
    throw error;
  }
};
