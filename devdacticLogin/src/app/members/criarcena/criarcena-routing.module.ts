import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CriarcenaPage } from "./criarcena.page";
import { CenasPage } from "../cenas/cenas.page";

const routes: Routes = [
  {
    path: "",
    component: CriarcenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CriarcenaPageRoutingModule {}
