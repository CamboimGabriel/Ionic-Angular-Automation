import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: "./dashboard/dashboard.module#DashboardPageModule"
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'alarms',
    loadChildren: () => import('./alarms/alarms.module').then( m => m.AlarmsPageModule)
  },
  {
    path: 'criaralarme',
    loadChildren: () => import('./criaralarme/criaralarme.module').then( m => m.CriaralarmePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule {}
