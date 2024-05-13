import {expect, test} from '@playwright/test';
import {Utils} from "./utils/POM/Utils";
import {SignUp} from "./utils/POM/Signup";
import {Login} from "./utils/POM/Login";
import {Home} from "./utils/POM/Home";

type Article = {title: string, description: string, body: string, tags: string}

test.only('Create new article', async ({page}) => {
  const utils = new Utils(new Login(page), new SignUp(page), new Home(page));
  await utils.loginOrSignup();

  const newArticle: Article = {
    title: 'Nuevo articulo',
    description: 'Testing Playwright',
    body: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
    tags: 'test, playwright'
  }

  await page.getByRole('link', { name: 'New Article' }).click();
  await page.getByPlaceholder('Article Title').fill(newArticle.title);
  await page.getByPlaceholder('What\'s this article about?').fill(newArticle.description);
  await page.getByPlaceholder('Write your article (in').fill(newArticle.body);
  await page.getByPlaceholder('Enter tags').fill(newArticle.tags);
  await page.getByRole('button', { name: 'Publish Article' }).click();
  await expect(page).toHaveURL(new RegExp(`/article/${newArticle.title.toLowerCase().replace(/ /g, '-')}-.*`));
  await expect(page.getByRole('heading', { name: newArticle.title })).toBeVisible();
});



// comprobar si existe el usuario
// si existe loguear
// si no existe registrarlo
// crear un articulo
