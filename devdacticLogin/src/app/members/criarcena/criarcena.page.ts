import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "./../../services/authentication.service";
import axios from "axios";
import { ReplaySubject } from "rxjs";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Events } from "@ionic/angular";

@Component({
  selector: "app-criarcena",
  templateUrl: "./criarcena.page.html",
  styleUrls: ["./criarcena.page.scss"]
})
export class CriarcenaPage implements OnInit {
  devices = [{}];
  nomeCena: String;
  cen = [];

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private location: Location,
    private event: Events
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().then(id => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token
      };

      axios
        .get("http://18.231.176.98:3000/users/" + id.user._id + "/devices/")
        .then(response => {
          this.devices = response.data.map(elem => ({
            ...elem,
            checked: false
          }));
        });
    });
  }

  remove(deviceID) {
    var dev = [];
    console.log(this.devices.length);
    for (var i = 0; i < this.devices.length; i++) {
      //@ts-ignore
      if (this.devices[i]._id !== deviceID) {
        console.log("entrou");
        dev.push(this.devices[i]);
      }
    }

    this.devices = dev;
    console.log(this.devices);
  }

  criaCena() {
    console.log(this.devices);

    for (var v = 0; v < this.devices.length; v++) {
      //@ts-ignore
      if (this.devices[v].checked === true) {
        this.cen.push({
          //@ts-ignore
          deviceID: this.devices[v]._id,
          estado_desejado: "ligado"
        });
      } else {
        this.cen.push({
          //@ts-ignore
          deviceID: this.devices[v]._id,
          estado_desejado: "desligado"
        });
      }
    }

    this.authService.getCurrentUser().then(id => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token
      };

      axios
        .post(
          "http://18.231.176.98:3000/users/" +
            id.user._id +
            "/scenes/create/" +
            this.nomeCena,
          this.cen
        )
        .then(e => console.log(e))
        .catch(e => console.log(e));
    });

    console.log(this.devices);
    this.tabSelected();
    this.location.back();
  }

  tabSelected() {
    this.event.publish("functionCall:tabSelected");
  }

  toggle(deviceID) {
    for (var k = 0; k < this.devices.length; k++) {
      //@ts-ignore
      if (this.devices[k]._id == deviceID) {
        //@ts-ignore
        this.devices[k].checked = !this.devices[k].checked;
      }
    }
  }
}
