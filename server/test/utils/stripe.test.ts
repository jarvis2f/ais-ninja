import stripe from "../../src/utils/stripe";
import * as path from "path";

require('dotenv').config({
  path: path.resolve(__dirname, '../../.env.development')
});

describe('Stripe', () => {
  const key = process.env.STRIPE_KEY;
  expect(key).not.toBeUndefined();
  it('precreate should work', async () => {
    await stripe.precreate({
        key: key!,
        success_url: 'http://localhost:5173',
        cancel_url: 'http://localhost:5173',
      },
      [{
        price_data: {
          currency: 'cny',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 400,
        },
        quantity: 1,
      }],
      '1234567890',
    ).then(session => {
      console.log(session)
      expect(session).not.toBeUndefined();
    }).catch(err => {
      console.log(err);
      expect(err).toBeUndefined();
    });
  });
});
