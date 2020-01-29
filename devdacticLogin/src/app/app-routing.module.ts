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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
