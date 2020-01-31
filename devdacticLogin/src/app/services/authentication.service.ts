import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { BehaviorSubject } from "rxjs";
import axios from "axios";
import { R3ResolvedDependencyType } from "@angular/compiler";

const TOKEN_KEY = "auth-token";
const CurrentSession = "data";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }

  login(username, pass) {
    axios
      .post("http://localhost:3000/auth/authenticate", {
        name: username,
        password: pass
      })
      .then(response => {
        this.storage.set(TOKEN_KEY, response.data.token).then(() => {
          this.storage.set(CurrentSession, response.data);
          this.authenticationState.next(true);
        });
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getCurrentUser() {
    return this.storage.get(CurrentSession).then(res => {
      console.log(res);
      return res;
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
