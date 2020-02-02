import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "./../../services/authentication.service";
import axios from "axios";
import { Location } from "@angular/common";
import { Events } from "@ionic/angular";

@Component({
  selector: "app-criaralarme",
  templateUrl: "./criaralarme.page.html",
  styleUrls: ["./criaralarme.page.scss"]
})
export class CriaralarmePage implements OnInit {
  devices = [{}];
  nomeAlarme: String;
  alarme;
  hora: number;
  minuto: number;
  repetir;

  dias = [
    {
      dom: "false",
      seg: "false",
      ter: "false",
      qua: "false",
      qui: "false",
      sex: "false",
      sab: "false"
    }
  ];

  constructor(
    private authService: AuthenticationService,
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

  toggle(deviceID) {
    for (var k = 0; k < this.devices.length; k++) {
      //@ts-ignore
      if (this.devices[k]._id == deviceID) {
        //@ts-ignore
        this.devices[k].checked = !this.devices[k].checked;
      }
    }
  }

  criar() {
    this.tabSelected();
    this.location.back();
  }

  tabSelected() {
    this.event.publish("functionCall:tabSelected");
  }
}
