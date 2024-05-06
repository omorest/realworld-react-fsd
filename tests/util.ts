import {Page, expect} from '@playwright/test';

export type User = {email: string, password: string, userName: string}

export async function login(page: Page, {email, password, userName}: User) {
  await page.goto('/');
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading', { name: userName })).toBeVisible();
}