import test from "@playwright/test";
import {Alice} from "./utils/fixtures/users";
import {signup} from "./utils/POM/Signup";

test.skip('sign up', async ({page}) => {
  await signup(page, Alice)
});
