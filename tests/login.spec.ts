import { test } from '@playwright/test';
import {Alice} from './utils/fixtures/users';
import {login} from "./utils/POM/Login";


test.skip('login', async ({page}) => {
  await login(page, Alice)
});

