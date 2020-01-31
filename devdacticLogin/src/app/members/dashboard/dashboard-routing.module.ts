import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardPage } from "./dashboard.page";
import { CenasPage } from "../cenas/cenas.page";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardPage,
    children: [
      {
        path: "cenas",
        loadChildren: () =>
          import("../cenas/cenas.module").then(m => m.CenasPageModule)
      },

      {
        path: "home",
        loadChildren: () =>
          import("../home/home.module").then(m => m.HomePageModule)
      },
      {
        path: "alarms",
        loadChildren: () =>
          import("../alarms/alarms.module").then(m => m.AlarmsPageModule)
      },
      {
        path: "cenas/criarcena",
        loadChildren: () =>
          import("../criarcena/criarcena.module").then(
            m => m.CriarcenaPageModule
          )
      }
    ]
  },
  {
    path: "",
    redirectTo: "dashboard/home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardPageRoutingModule {}
