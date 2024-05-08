import { test } from '@playwright/test';
import { login, User } from './utils';


test('login', async ({page}) => {
  const alice: User = {email: 'alice@test.com', password: "123456789", userName: "Alice"}
  await login(page, alice)
});

