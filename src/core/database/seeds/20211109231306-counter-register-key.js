module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'CounterRegisters',
      {
        url: 'ton.com.br',
        key: 'a3126dd5-19c0-4210-9cd3-338e0009ea99',
      },
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('CounterRegisters', null, {});
  },
};
