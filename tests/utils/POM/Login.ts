import {expect, Page} from "@playwright/test";
import {Alice, User} from "../fixtures/users";

// Delete
// export async function login(page: Page, {email, password, userName}: User) {
//   await page.goto('/');
//   await page.getByRole('link', {name: 'Sign in'}).click();
//   await page.getByPlaceholder('Email').fill(email);
//   await page.getByPlaceholder('Password').fill(password);
//   await page.getByRole('button', {name: 'Sign in'}).click();
//   await expect(page.getByRole('heading', {name: userName})).toBeVisible();
// }

export class Login {

  constructor(private readonly page: Page) {}

  async login({email=Alice.email, password=Alice.password, userName=Alice.userName} = {}) {
    await this.fill({email, password});
    await this.waitForNavigation({userName});
  }

  public async waitForNavigation({userName =Alice.userName, timeout=30000} = {}) {
    await this.page.waitForURL(`/profile/${userName}/`, {timeout});
  }

  public async fill({email= Alice.email, password= Alice.password} = {}) {
    await this.page.getByPlaceholder('Email').fill(email);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', {name: 'Sign in'}).click();
  }

  public async navigate() {
    await this.page.goto('/');
    await this.page.getByRole('link', {name: 'Sign in'}).click();
  }
}
