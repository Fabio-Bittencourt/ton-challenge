const { open, close } = require('../../../../src/core/lib/db');

describe('DB::Connection:: SUCCESS', () => {
  it('should open a connection with the database client', async () => {
    await expect(Promise.resolve(open())).resolves.toBe();
  });

  it('should close a connection with the database client', async () => {
    await expect(Promise.resolve(close())).resolves.toBe();
  });
});
