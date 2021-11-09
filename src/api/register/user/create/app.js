const { logger } = require('../../../../core/lib/logger');
const { connection } = require('../../../../core/services/sequelize');
const { create } = require('../../controller');

module.exports.handler = async (event) => {
  const { body } = event;
  logger.info('::Lambda Register has been started::');
  try {
    connection();
    const result = await create(body);
    return {
      statusCode: 200,
      body: JSON.stringify({
        result,
      }),
    };
  } catch (error) {
    logger.error('::Lambda Register return a Error::', error);
    throw error;
  }
};
