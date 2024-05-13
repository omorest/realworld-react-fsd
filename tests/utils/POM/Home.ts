import {Page} from "@playwright/test";
import {Alice} from "../fixtures/users";

export class Home {

  constructor(private readonly page: Page) {}

  public async navigate() {
    await this.page.goto('/');
  }

  public async ensureIsVisible({timeout=30000} = {}) {
    await this.page.getByRole('button', {name: 'Your Feed'}).waitFor({timeout});
  }
}
