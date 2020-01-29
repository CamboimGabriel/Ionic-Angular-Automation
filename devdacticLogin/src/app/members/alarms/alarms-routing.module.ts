import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlarmsPage } from './alarms.page';

const routes: Routes = [
  {
    path: '',
    component: AlarmsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlarmsPageRoutingModule {}
