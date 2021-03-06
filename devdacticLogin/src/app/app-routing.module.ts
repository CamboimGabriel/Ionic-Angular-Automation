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
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./members/cenas/cenas.module").then(m => m.CenasPageModule)
  },
  {
    path: "home",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./members/home/home.module").then(m => m.HomePageModule)
  },
  {
    path: "alarms",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./members/alarms/alarms.module").then(m => m.AlarmsPageModule)
  },
  {
    path: "criarcena",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./members/criarcena/criarcena.module").then(
        m => m.CriarcenaPageModule
      )
  },
  {
    path: "criaralarme",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./members/criaralarme/criaralarme.module").then(
        m => m.CriaralarmePageModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
