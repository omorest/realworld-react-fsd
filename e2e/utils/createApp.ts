import { Page } from '@playwright/test';
import { Article } from './POM/Article';
import { Home } from './POM/Home';
import { Login } from './POM/Login';
import { SignUp } from './POM/Signup';
import { Utils } from './POM/Utils';
import { NewArticle } from './POM/NewArticle';

export function createApp(page: Page, { baseURL = '/' } = {}) {
  const home = new Home(page, { baseURL });
  const login = new Login(page, { baseURL });
  const signUp = new SignUp(page, { baseURL });
  return {
    home,
    login,
    signUp,
    article: new Article(page),
    newArticle: new NewArticle(page, home),
    utils: new Utils(login, signUp, home),
  };
}
