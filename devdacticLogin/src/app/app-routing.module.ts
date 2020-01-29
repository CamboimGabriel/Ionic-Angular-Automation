import { AuthGuard } from "./guards/auth.guard";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    loadChildren: "./public/login/login.module#LoginPageModule"
  },
  {
    path: "members",
    canActivate: [AuthGuard],
    loadChildren: "./members/member-routing.module#MemberRoutingModule"
  },
  {
    path: "cenas",
    loadChildren: () =>
      import("./members/cenas/cenas.module").then(m => m.CenasPageModule)
  },
  {
    path: "home",
    loadChildren: () =>
      import("./members/home/home.module").then(m => m.HomePageModule)
  },
  {
    path: "alarms",
    loadChildren: () =>
      import("./members/alarms/alarms.module").then(m => m.AlarmsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
