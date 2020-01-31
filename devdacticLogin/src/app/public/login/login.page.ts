import { AuthenticationService } from "./../../services/authentication.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  username: string;
  password: string;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.username, this.password);
  }
}
