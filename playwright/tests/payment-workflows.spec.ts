import { test, expect } from '@/playwright/fixtures/index.fixtures';
import assertions from '@/playwright/data/assertions.json';
import 'dotenv/config' // to import the .env file and use the credentials from it

const secrets: NodeJS.ProcessEnv = process.env; // create a variable to store the credentials from the .env file

test.describe('Payment Workflows', () => { 
  test('should process a successful payment', async ({ e2e, checkoutPage }) => {
    await e2e.processAPayment(secrets.SUCCESSFUL_USERNAME, secrets.SUCCESSFUL_PASSWORD);
    // await expect(headerPage.page).toHaveURL('/cart');
    await checkoutPage.transactionId.waitFor({ state: 'visible' });
    await expect(checkoutPage.orderPlacedConfirmation).toHaveText(assertions.orderPlacedConfirmation);
  });

  test('should process a failed payment', async ({ e2e, checkoutPage }) => {
    await e2e.processAPayment(secrets.FAILED_USERNAME, secrets.SUCCESSFUL_PASSWORD);
    // await expect(headerPage.page).toHaveURL('/cart');
    await checkoutPage.paymentError.waitFor({ state: 'visible' })
    await expect(checkoutPage.paymentError).toHaveText(assertions.paymentError);
  });

})



