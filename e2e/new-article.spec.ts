import { test } from './utils/test';

test('Create new article', async ({ app }) => {
  await app.newArticle.navigate();
  await app.newArticle.fill();
  await app.article.expectToBeVisible();
});
