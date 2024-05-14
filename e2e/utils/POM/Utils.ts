import { Login } from './Login';
import { SignUp } from './Signup';
import { Alice } from '../fixtures/users';
import { Home } from './Home';

export class Utils {
  constructor(
    private readonly login: Login,
    private readonly signup: SignUp,
    private readonly home: Home,
  ) {}

  async loginOrSignup({
    name = Alice.userName,
    email = Alice.email,
    password = Alice.password,
  } = {}) {
    await this.home.navigate();
    try {
      await this.home.ensureIsVisible({ timeout: 300 });
    } catch {
      await this.login.navigate();
      await this.login.fill({ email, password });
      try {
        await this.login.waitForNavigation({ timeout: 300 });
      } catch {
        await this.signup.navigate();
        await this.signup.fill({ email, password, userName: name });
        await this.signup.waitForNavigation({ timeout: 300 });
      }
    }
  }
}
