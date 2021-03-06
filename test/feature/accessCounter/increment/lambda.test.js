const {
  handler,
} = require('../../../../src/api/accessCounter/increment/lambda');
const CounterRegister = require('../../../../src/core/database/models/CounterRegister');
const { connection } = require('../../../../src/core/services/sequelize');

describe('AccessCounter::increment::app::handler', () => {
  beforeAll(async () => {
    connection();
    CounterRegister.create({
      url: 'ton.com.br',
      key: 'a3126dd5-19c0-4210-9cd3-338e0009ea99',
    });
  });

  afterAll(async () => {
    CounterRegister.truncate({ cascade: true });
  });

  it('increment 1 access for a given URL', async () => {
    const event = {
      queryStringParameters: { url: 'ton.com.br' },
    };

    const response = await handler(event);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toContainEqual({ result: { value: 1 } });
  });

  it('error test', async () => {
    const event = {
      queryStringParameters: { url: 'teste.com.br' },
    };

    const response = await handler(event);
    expect(response.body).toEqual('{}');
  });
});
