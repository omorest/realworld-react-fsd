import {Login} from "./Login";
import {SignUp} from "./Signup";
import {Alice} from "../fixtures/users";
import {Home} from "./Home";


export class Utils {
  constructor(private readonly login: Login, private readonly signup: SignUp, private  readonly home: Home) {}

  async loginOrSignup() {
    await this.home.navigate();
    try {
      await this.home.ensureIsVisible({timeout:300});
    } catch {
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
}
