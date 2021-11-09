const { isProd } = require('../core/lib/environment');

const development = {
  dialect: 'postgres',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  define: {
    timestamps: true,
    underscored: true,
  },
};

const production = {
  dialect: 'postgres',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  define: {
    timestamps: true,
    underscored: true,
  },
};

module.exports = isProd ? production : development;
