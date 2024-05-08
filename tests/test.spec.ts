import {test} from "@playwright/test";
import {Alice} from "./utils/fixtures/users";
import {loginOrSignup} from "./setup";


test("Initial tests", async ({page}) => {

  await loginOrSignup(page, Alice)

})
