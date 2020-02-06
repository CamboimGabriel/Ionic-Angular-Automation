import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "./../../services/authentication.service";
import axios from "axios";
import { NavController, Events } from "@ionic/angular";

@Component({
  selector: "app-alarms",
  templateUrl: "./alarms.page.html",
  styleUrls: ["./alarms.page.scss"]
})
export class AlarmsPage implements OnInit {
  alarms = [{}];

  constructor(
    private authService: AuthenticationService,
    private event: Events
  ) {
    this.event.subscribe("functionCall:tabSelected", eventData => {
      this.authService.getCurrentUser().then(id => {
        axios.defaults.headers.common = {
          Authorization: "Bearer " + id.token
        };

        axios
          .get("http://localhost:3000/users/" + id.user._id + "/alarms/")
          .then(response => {
            console.log(response.data);

            this.alarms = response.data;

            console.log(this.alarms);
          });
      });
    });
  }

  ngOnInit() {
    this.authService.getCurrentUser().then(id => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token
      };

      axios
        .get("http://localhost:3000/users/" + id.user._id + "/alarms/")
        .then(response => {
          console.log(response.data);

          this.alarms = response.data;

          console.log(this.alarms);
        });
    });
  }
  logout() {
    this.authService.logout();
  }

  doRefresh(event) {
    console.log("Begin async operation");
    this.authService.getCurrentUser().then(id => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token
      };

      axios
        .get("http://localhost:3000/users/" + id.user._id + "/alarms/")
        .then(response => {
          console.log(response.data);

          this.alarms = response.data;

          console.log(this.alarms);
        });
    });

    setTimeout(() => {
      console.log("Async operation has ended");
      event.target.complete();
    }, 2000);
  }

  deletarAlarme(idAlarme) {
    this.authService.getCurrentUser().then(id => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token
      };

      axios
        .post("http://localhost:3000/users/alarms/" + idAlarme + "/delete")
        .then(e =>
          axios
            .get("http://localhost:3000/users/" + id.user._id + "/alarms/")
            .then(response => {
              console.log("pegou");

              this.alarms = response.data;

              console.log(e);
            })
        )
        .catch(e => console.log(e));
    });
  }

  mudarEstado(idAlarme, estado) {
    this.authService.getCurrentUser().then(id => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token
      };

      axios
        .post("http://localhost:3000/users/alarms/" + idAlarme + "/" + estado)
        .then(e =>
          axios
            .get("http://localhost:3000/users/" + id.user._id + "/alarms/")
            .then(response => {
              console.log("pegou");

              this.alarms = response.data;

              console.log(e);
            })
        )
        .catch(e => console.log(e));
    });
  }
}
