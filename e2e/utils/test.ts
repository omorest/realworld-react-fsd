import { test as baseTest, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import {Login} from "./POM/Login";
import {SignUp} from "./POM/Signup";
import {Home} from "./POM/Home";
import {Utils} from "./POM/Utils";

export * from '@playwright/test';
export const test = baseTest.extend<{}, { workerStorageState: string }>({
  // Use the same storage state for all tests in this worker.
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  // Authenticate once per worker with a worker-scoped fixture.
  workerStorageState: [async ({ browser }, use) => {
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
    const baseURL = 'http://localhost:5173/'
    const utils = new Utils(new Login(page, {baseURL}), new SignUp(page, {baseURL}), new Home(page, {baseURL}));
    await utils.loginOrSignup();

    // End of authentication steps.

    await page.context().storageState({ path: fileName });
    await page.close();
    await use(fileName);
  }, { scope: 'worker' }],
});
