import * as fs from 'fs';
import { test as baseTest } from '@playwright/test';
import { createApp } from './createApp';

export * from '@playwright/test';
export const test = baseTest.extend<
  { app: ReturnType<typeof createApp> },
  { workerStorageState: string }
>({
  // Use the same storage state for all tests in this worker.
  storageState: ({ workerStorageState }, use) => use(workerStorageState),
  app: ({ page }, use) => use(createApp(page)),

  // Authenticate once per worker with a worker-scoped fixture.
  workerStorageState: [
    async ({ browser }, use) => {
      // Use parallelIndex as a unique identifier for each worker.
      const id = test.info().parallelIndex;
      const fileName = `e2e/.auth/${id}.json`;

      if (fs.existsSync(fileName)) {
        // Reuse existing authentication state if any.
        await use(fileName);
        return;
      }

      // Important: make sure we authenticate in a clean environment by unsetting storage state.
      const page = await browser.newPage({ storageState: undefined });
      const baseURL = 'http://localhost:5173/';
      const app = createApp(page, { baseURL });
      await app.utils.loginOrSignup({
        email: `alice_${id}@gmail.com`,
        name: `Alice ${id}`,
      });
      // End of authentication steps.

      await page.context().storageState({ path: fileName });
      await page.close();
      await use(fileName);
    },
    { scope: 'worker' },
  ],
});
