import {test} from "@playwright/test";
import {loginOrSignup} from "./setup";
import {Alice} from "./utils/fixtures/users";


test("Initial tests", async ({page}) => {
  await loginOrSignup(page, Alice)
})
