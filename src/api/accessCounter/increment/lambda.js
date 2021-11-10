const { logger } = require('../../../core/lib/logger');
const { connection } = require('../../../core/services/sequelize');
const { increment } = require('../controller');

module.exports.handler = async (event) => {
  const { url } = event.queryStringParameters;

  logger.info('::Lambda Access Counter has been started::');
  try {
    connection();
    const result = await increment(url);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    logger.error('::Lambda Access Counter return a Error::', error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
