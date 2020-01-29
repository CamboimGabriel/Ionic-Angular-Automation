import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardPage } from "./dashboard.page";
import { CenasPage } from "../cenas/cenas.page";

const routes: Routes = [
  {
    path: "",
    component: DashboardPage,
    children: [
      {
        path: "cenas",
        loadChildren: () =>
          import("../cenas/cenas.module").then(m => m.CenasPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardPageRoutingModule {}
