const CounterRegister = require('../../core/database/models/CounterRegister');
const { countAPI } = require('../../core/services/countAPI');
const { logger } = require('../../core/lib/logger');

const handlerIncrementVisit = async ({ key }) => countAPI.hit(key);

const handlerGetvisits = async ({ key }) => countAPI.get(key);

const handleCreateAKey = async (url) => countAPI.create({ namespace: url});

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

const createNewKey = async (key, url) => {
  try {
    const result = await CounterRegister.create({ url, key });
    return result;
  } catch (error) {
    logger.error(`::ERROR:: On Creating a Key::`, error);
    throw error;
  }
};

const handleForNotFoundKey = async (url) => {
  let result;
  try {
    const { key } = await handleCreateAKey(url);
    result = await createNewKey(key, url);
  } catch (error) {
    logger.error(`::ERROR:: On Recreate a key::`, error);
  }
  return result;
};
module.exports.increment = async (url) => {
  const result = await getKeyByURL(url);
  let counter;

  if (result !== null) {
    const { value } = await handlerIncrementVisit(result);
    counter = { visits: value };
  } else {
    const newKey = await handleForNotFoundKey(url);
    const { value } = await handlerIncrementVisit(newKey);
    counter = { visits: value };
  }

  logger.error(`::ERROR:: URL ${url} does not exists::`);
  return counter;
};

module.exports.get = async (params) => {
  const result = await getKeyByURL(params);
  let counter;

  if (result !== null) {
    const { value } = await handlerGetvisits(result);
    counter = { visits: value };
  }
  logger.error(`::ERROR:: URL ${params} does not exists::`);
  return counter;
};
