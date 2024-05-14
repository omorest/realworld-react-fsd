import { Page } from '@playwright/test';
import { Alice } from '../fixtures/users';

export class Login {
  constructor(
    private readonly page: Page,
    private readonly options = { baseURL: '/' },
  ) {}

  async login({ email = Alice.email, password = Alice.password } = {}) {
    await this.fill({ email, password });
    await this.waitForNavigation();
  }

  public async waitForNavigation({ timeout = 30000 } = {}) {
    await this.page.waitForURL(/\/profile\/.*/, {
      timeout,
    });
  }

  public async fill({ email = Alice.email, password = Alice.password } = {}) {
    await this.page.getByPlaceholder('Email').fill(email);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
  }

  public async navigate() {
    await this.page.goto(this.options.baseURL);
    await this.page.getByRole('link', { name: 'Sign in' }).click();
  }
}
