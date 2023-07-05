import sms from "../../src/utils/sms";
import * as path from "path";
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env')
});

process.env.NODE_ENV = 'local';
require('../../src/config/config').initConfig();
test('send code sms', async () => {
  const phone = process.env.ALI_SMS_TEST_PHONE;
  expect(phone).not.toBeUndefined();
  console.log('phone', phone)
  await sms.send(phone!, '123456').then((result) => {
    expect(result).toBe(true);
  });
});
