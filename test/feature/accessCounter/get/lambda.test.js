const { handler } = require('../../../../src/api/accessCounter/get/lambda');

describe('AccessCounter::get::app::handler', () => {
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
