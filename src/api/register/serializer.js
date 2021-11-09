module.exports.userSerializer = ({ firstName, lastName, email, birthDate }) => {
  return {
    firstName,
    lastName,
    email,
    birthDate,
  };
};
