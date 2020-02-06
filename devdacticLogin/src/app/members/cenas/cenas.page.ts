import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "./../../services/authentication.service";
import axios from "axios";
import { NavController, Events } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-cenas",
  templateUrl: "./cenas.page.html",
  styleUrls: ["./cenas.page.scss"]
})
export class CenasPage implements OnInit {
  cenas = [{}];
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private event: Events
  ) {
    this.event.subscribe("functionCall:tabSelected", eventData => {
      this.authService.getCurrentUser().then(id => {
        axios.defaults.headers.common = {
          Authorization: "Bearer " + id.token
        };

        axios
          .get("http://18.231.119.219:3000/users/" + id.user._id + "/scenes/")
          .then(response => {
            console.log(response.data);

            this.cenas = response.data;

            console.log(this.cenas);
          });
      });
    });
  }

  ngOnInit() {
    console.log("entrou");

    this.authService.getCurrentUser().then(id => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token
      };

      axios
        .get("http://18.231.119.219:3000/users/" + id.user._id + "/scenes/")
        .then(response => {
          console.log(response.data);

          this.cenas = response.data;

          console.log(this.cenas);
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
        .get("http://18.231.119.219:3000/users/" + id.user._id + "/scenes/")
        .then(response => {
          console.log(response.data);

          this.cenas = response.data;

          console.log(this.cenas);
        });
    });

    setTimeout(() => {
      console.log("Async operation has ended");
      event.target.complete();
    }, 2000);
  }

  publishCena(deviceID, data) {
    console.log(data);
    console.log(deviceID);

    this.authService.getCurrentUser().then(id => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token
      };

      axios
        .post(
          "http://18.231.119.219:3000/users/devices/" + deviceID + "/shadow",
          data
        )
        .then(e => console.log(e))
        .catch(e => console.log(e));
    });
  }

  enviarCena(idCena) {
    for (var i = 0; i < this.cenas.length; i++) {
      //@ts-ignore
      if (this.cenas[i]._id === idCena) {
        //@ts-ignore
        for (var j = 0; j < this.cenas[i].cena.length; j++) {
          //@ts-ignore
          console.log(this.cenas[i].cena[j]);
          const dado =
            //@ts-ignore
            '{"estado":"' + this.cenas[i].cena[j].estado_desejado + '"}';

          console.log(JSON.parse(dado));
          //@ts-ignore
          this.publishCena(this.cenas[i].cena[j].deviceID, JSON.parse(dado));
        }
      }
    }
  }

  deletarCena(idCena) {
    this.authService.getCurrentUser().then(id => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token
      };

      axios
        .post("http://18.231.119.219:3000/users/scenes/" + idCena + "/delete")
        .then(e =>
          axios
            .get("http://18.231.119.219:3000/users/" + id.user._id + "/scenes/")
            .then(response => {
              console.log("pegou");

              this.cenas = response.data;

              console.log(e);
            })
        )
        .catch(e => console.log(e));
    });
  }
}
