import { expect, Page } from '../test';
import { REACT_INTRODUCTION } from '../../article';

export class Article {
  constructor(private readonly page: Page) {}

  public async expectToBeVisible({
    title = REACT_INTRODUCTION.title,
    description = REACT_INTRODUCTION.description,
    body = REACT_INTRODUCTION.body,
    tags = REACT_INTRODUCTION.tags,
  } = {}) {
    await expect(this.page.getByRole('heading', { name: title })).toBeVisible();
  }
}
