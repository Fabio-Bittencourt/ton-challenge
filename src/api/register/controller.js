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
  return user;
};

const getUserByEmail = async (email) => {
  let user;
  try {
    user = await User.findOne({ where: { email } });
  } catch (error) {
    logger.error(':: There are some error on save ::', error);
    throw error;
  }
  return user;
};

module.exports.create = async (params) => {
  const response = await createUser(params);
  return userSerializer(response);
};

module.exports.getOne = async (email) => {
  let result;
  const response = await getUserByEmail(email);

  if (response !== null) {
    result = userSerializer(response);
  }

  logger.error(`::ERROR:: The email: ${email} does not exists`);
  return result;
};
