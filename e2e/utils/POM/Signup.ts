import { Page } from '@playwright/test';
import { Alice } from '../fixtures/users';

export class SignUp {
  constructor(
    private readonly page: Page,
    private readonly options = { baseURL: '/' },
  ) {}

  async signup({
    email = Alice.email,
    password = Alice.password,
    userName = Alice.userName,
  } = {}) {
    await this.fill({ userName, email, password });
    await this.waitForNavigation();
  }

  public async waitForNavigation({ timeout = 30000 } = {}) {
    await this.page.waitForURL(/\/profile\/.*/, {
      timeout,
    });
  }

  public async fill({
    userName = Alice.userName,
    email = Alice.email,
    password = Alice.password,
  } = {}) {
    await this.page.getByPlaceholder('Your Name').fill(userName);
    await this.page.getByPlaceholder('Email').fill(email);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Sign up' }).click();
  }

  public async navigate() {
    await this.page.goto(this.options.baseURL);
    await this.page.getByRole('link', { name: 'Sign up' }).click();
  }
}
