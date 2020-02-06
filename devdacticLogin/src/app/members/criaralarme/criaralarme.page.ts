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

  hora;
  minuto;

  repetir = false;
  cen = [];

  dias = {
    dom: false,
    seg: false,
    ter: false,
    qua: false,
    qui: false,
    sex: false,
    sab: false
  };

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
        .get("http://localhost:3000/users/" + id.user._id + "/devices/")
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

    this.alarme = {
      repetir: this.repetir,
      horario: { hora: this.hora, minuto: this.minuto },
      dias: this.dias,
      cena: this.cen
    };

    console.log("OPAAAAAA");
    console.log(this.alarme);

    this.authService.getCurrentUser().then(id => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token
      };

      axios
        .post(
          "http://localhost:3000/users/" +
            id.user._id +
            "/alarms/create/" +
            this.nomeAlarme,
          this.alarme
        )
        .then(e => console.log(e))
        .catch(e => console.log(e));
    });

    this.tabSelected();
    this.location.back();
  }

  tabSelected() {
    this.event.publish("functionCall:tabSelected");
  }
}
