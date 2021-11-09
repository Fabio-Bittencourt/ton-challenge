const CounterRegister = require('../../core/database/models/CounterRegisterAccess');
const { countAPI } = require('../../core/services/countAPI');
const { logger } = require('../../core/lib/logger');

const handlerIncrementVisit = async ({ key }) => countAPI.hit(key);

const handlerGetvisits = async ({ key }) => countAPI.get(key);

const getKeyByURL = async (url) => {
  try {
    const result = await CounterRegister.findOne({
      where: {
        url,
      },
    });
    return result;
  } catch (error) {
    logger.error(`::ERROR::`, error);
    throw error;
  }
};

module.exports.increment = async (params) => {
  const result = await getKeyByURL(params);
  let counter;

  if (result !== null) {
    const { value } = await handlerIncrementVisit(result);
    counter = { value };
  }
  logger.error(`::ERROR:: URL ${params} does not exists`);
  return counter;
};

module.exports.get = async (params) => {
  const result = await getKeyByURL(params);
  let counter;

  if (result !== null) {
    const { value } = await handlerGetvisits(result);
    counter = { value };
  }
  logger.error(`::ERROR:: URL ${params} does not exists`);
  return counter;
};
