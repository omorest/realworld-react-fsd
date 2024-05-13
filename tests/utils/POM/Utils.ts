import {Login} from "./Login";
import {SignUp} from "./Signup";
import {Alice} from "../fixtures/users";


export class Utils {
  constructor(private readonly login: Login, private readonly signup: SignUp) {}

  async loginOrSignup() {
    await this.login.navigate();
    await this.login.fill(Alice);
    try {
      await this.login.waitForNavigation({timeout:300, ...Alice});
    } catch {
      await this.signup.navigate();
      await this.signup.fill(Alice);
      await this.signup.waitForNavigation({timeout:300, ...Alice});
    }
  }
}
