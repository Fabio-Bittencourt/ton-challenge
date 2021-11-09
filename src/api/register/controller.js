const { logger } = require('../../core/lib/logger');
const User = require('../../core/database/models/User');
const { userSerializer } = require('./serializer');

const createUser = async (params) => {
  let user;
  try {
    user = await User.create(params);
    logger.info(':: User saved successfully ::');
  } catch (error) {
    logger.error(':: There are some error on save ::', error);
    throw error;
  }
  return userSerializer(user);
};
module.exports.create = async (params) => {
  const response = await createUser(params);
  return response;
};
