import { test, expect, Page } from '@playwright/test';

type User = {email: string, password: string, userName: string}

async function login(page: Page, {email, password, userName}: User) {
  await page.goto('/');
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading', { name: userName })).toBeVisible();
}

test('login', async ({page}) => {
  const alice: User = {email: 'alice@test.com', password: "123456789", userName: "Alice"}
  await login(page, alice)
});

