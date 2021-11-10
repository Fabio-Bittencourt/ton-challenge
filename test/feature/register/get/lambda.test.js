const { handler } = require('../../../../src/api/register/user/get/lambda');
const User = require('../../../../src/core/database/models/User');

describe('Register::User::get::app::handler', () => {
  describe('when an email not registered has been passed', () => {
    it('should not return user informations', async () => {
      const event = {
        queryStringParameters: { email: 'ton@teste.com.br' },
      };

      const response = await handler(event);
      expect(response.body).toBe('{}');
    });
  });

  describe('when an email registered has been passed', () => {
    const email = 'ton1@teste.com.br';

    beforeAll(async () => {
      User.create({
        email,
        firstName: 'Teste Carlos',
        lastName: 'da Silva Teste',
        birthDate: new Date('05/07/1994'),
      });
    });

    afterAll(() => {
      User.truncate({ cascade: true });
    });

    it('should return informations about the user', async () => {
      const event = {
        queryStringParameters: { email },
      };

      const response = await handler(event);
      expect(response.body).toBe();
    });
  });
});
