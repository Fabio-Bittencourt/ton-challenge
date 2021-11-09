const { Model, DataTypes } = require('sequelize');

class CounterRegisters extends Model {
  static init(sequelize) {
    super.init(
      {
        url: DataTypes.STRING,
        key: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
  }
}

module.exports = CounterRegisters;
