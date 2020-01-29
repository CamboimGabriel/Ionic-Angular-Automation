import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CenasPage } from './cenas.page';

const routes: Routes = [
  {
    path: '',
    component: CenasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CenasPageRoutingModule {}
