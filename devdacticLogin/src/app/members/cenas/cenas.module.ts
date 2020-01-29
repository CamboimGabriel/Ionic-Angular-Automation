import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CenasPageRoutingModule } from './cenas-routing.module';

import { CenasPage } from './cenas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CenasPageRoutingModule
  ],
  declarations: [CenasPage]
})
export class CenasPageModule {}
