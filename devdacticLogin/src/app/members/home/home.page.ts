import { AuthenticationService } from "./../../services/authentication.service";
import { Component, OnInit } from "@angular/core";
import axios from "axios";

import { Observable, Subscription } from "rxjs";

import {
  IMqttMessage,
  MqttModule,
  IMqttServiceOptions,
  MqttService
} from "ngx-mqtt";

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: "18.231.176.98",
  port: 9001,
  path: "/mqtt"
};

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  private subscription: Subscription;
  public message: string;

  temp = 19;
  devices = [{}];
  countO = 0;
  countC = 1;

  constructor(
    private _mqttService: MqttService,
    private authService: AuthenticationService
  ) {
    this.authService.getCurrentUser().then(id => {
      console.log(id.user._id);
      this.subscription = this._mqttService
        .observe(id.user._id + "/+/update")
        .subscribe((message: IMqttMessage) => {
          this.authService.getCurrentUser().then(id => {
            console.log(this.message);
            axios.defaults.headers.common = {
              Authorization: "Bearer " + id.token
            };

            axios
              .get("http://localhost:3000/users/" + id.user._id + "/devices/")
              .then(response => {
                this.devices = response.data;
              });
          });
        });
    });
  }

  doRefresh(event) {
    console.log("Begin async operation");
    this.authService.getCurrentUser().then(id => {
      console.log(this.message);
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token
      };

      axios
        .get("http://localhost:3000/users/" + id.user._id + "/devices/")
        .then(response => {
          this.devices = response.data;
        });
    });
    setTimeout(() => {
      console.log("Async operation has ended");
      event.target.complete();
    }, 2000);
  }

  ngOnInit() {
    this.authService.getCurrentUser().then(id => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token
      };

      axios
        .get("http://localhost:3000/users/" + id.user._id + "/devices/")
        .then(response => {
          this.devices = response.data;
        });
    });
  }

  publish(deviceID, data) {
    console.log(data);
    console.log(deviceID);
    this.authService.getCurrentUser().then(id => {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + id.token
      };

      axios
        .post(
          "http://localhost:3000/users/devices/" + deviceID + "/shadow",
          data
        )
        .then(e => console.log(e))
        .catch(e => console.log(e));
    });
  }

  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, { qos: 1, retain: true });
  }

  logout() {
    this.authService.logout();
  }
}
