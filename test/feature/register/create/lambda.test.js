const { handler } = require('../../../../src/api/register/user/create/lambda');
const { connection } = require('../../../../src/core/services/sequelize');
const User = require('../../../../src/core/database/models/User');

describe('Register::User::create::app::handler', () => {
  beforeEach(async () => {
    connection();
    User.truncate({ cascade: true });
  });

  it('save an user on database', async () => {
    const event = {
      body: {
        firstName: 'Teste Carlos',
        lastName: 'da Silva Teste',
        email: 'teste@teste.com.br',
        birthDate: new Date('05/07/1994'),
      },
    };

    const response = await handler(event);
    const { result } = response.body;

    expect(response.statusCode).toEqual(200);
    expect(result).toBe({
      firstName: 'Teste Carlos',
      lastName: 'da Silva Teste',
      email: 'teste@teste.com.br',
      birthDate: new Date('05/07/1994'),
    });
  });

  it.skip('error test', async () => {
    const event = {
      queryStringParameters: { url: 'teste.com.br' },
    };

    const response = await handler(event);
    expect(response.body).toEqual('{}');
  });
});
