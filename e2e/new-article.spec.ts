import { test } from './utils/test';
import { Article } from './utils/POM/Article';
import { createApp } from './utils/createApp';

test('Create new article', async ({ page }) => {
  const app = createApp(page);
  await app.newArticle.navigate();
  await app.newArticle.fill();
  await app.article.expectToBeVisible();
});
