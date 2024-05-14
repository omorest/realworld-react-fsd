import { expect, test } from './utils/test';
import { NewArticle } from './utils/POM/NewArticle';
import { Home } from './utils/POM/Home';
import { Article } from './utils/POM/Article';

test('Create new article', async ({ page }) => {
  const newArticle = new NewArticle(page, new Home(page));
  await newArticle.navigate();
  await newArticle.fill();
  const article = new Article(page);
  await article.expectToBeVisible();
});
