import { Page } from '@playwright/test';
import {User} from "./utils/fixtures/users";

import {login} from "./utils/POM/Login";
import {signup} from "./utils/POM/Signup";

export async function loginOrSignup(page: Page, user: User) {
    try {
      await login(page, user)
    } catch {
      await signup(page, user)
    }
}
