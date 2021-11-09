const { logger } = require('../../../../core/lib/logger');
const { connection } = require('../../../../core/services/sequelize');
const { getOne } = require('../../controller');

module.exports.handler = async (event) => {
  const { email } = event.queryStringParameters;
  logger.info('::Lambda Register Get has been started::');
  try {
    connection();
    const result = await getOne(email);
    return {
      statusCode: 200,
      body: JSON.stringify({
        result,
      }),
    };
  } catch (error) {
    logger.error('::Lambda Register Get return a Error::', error);
    throw error;
  }
};
