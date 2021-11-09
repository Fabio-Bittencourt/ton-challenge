const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        birthDate: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: 'User',
      },
    );
  }
}

module.exports = User;
