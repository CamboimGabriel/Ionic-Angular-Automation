import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "./../../services/authentication.service";
@Component({
  selector: "app-alarms",
  templateUrl: "./alarms.page.html",
  styleUrls: ["./alarms.page.scss"]
})
export class AlarmsPage implements OnInit {
  constructor(private authService: AuthenticationService) {}

  ngOnInit() {}
  logout() {
    this.authService.logout();
  }
  doRefresh(event) {
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      event.target.complete();
    }, 2000);
  }
}
