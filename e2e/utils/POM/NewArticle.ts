import { Page } from '@playwright/test';
import { REACT_INTRODUCTION } from '../../article';
import { Home } from './Home';

export class NewArticle {
  constructor(
    private readonly page: Page,
    private readonly home: Home,
  ) {}

  public async navigate() {
    await this.home.navigate();
    await this.home.navigateToNewArticle();
  }

  public async fill({
    title = REACT_INTRODUCTION.title,
    description = REACT_INTRODUCTION.description,
    body = REACT_INTRODUCTION.body,
    tags = REACT_INTRODUCTION.tags,
  } = {}) {
    await this.page.getByPlaceholder('Article Title').fill(title);
    await this.page
      .getByPlaceholder("What's this article about?")
      .fill(description);
    await this.page.getByPlaceholder('Write your article (in').fill(body);
    await this.page.getByPlaceholder('Enter tags').fill(tags);
    await this.page.getByRole('button', { name: 'Publish Article' }).click();
    await this.page.waitForURL(/\/article\/.*/);
  }
}
