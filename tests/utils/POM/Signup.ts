import {expect, Page} from "@playwright/test";
import {User} from "../fixtures/users";

export async function signup(page: Page, user: User) {
  await page.goto('/');
  await page.getByRole('link', {name: 'Sign up'}).click();
  await page.getByPlaceholder('Your Name').fill(user.userName);
  await page.getByPlaceholder('Email').fill(user.email);
  await page.getByPlaceholder('Password').fill(user.password);
  await page.getByRole('button', {name: 'Sign up'}).click();
  await expect(page.getByRole('heading', {name: user.userName})).toBeVisible()
}
