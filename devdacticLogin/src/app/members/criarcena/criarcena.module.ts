import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarcenaPageRoutingModule } from './criarcena-routing.module';

import { CriarcenaPage } from './criarcena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriarcenaPageRoutingModule
  ],
  declarations: [CriarcenaPage]
})
export class CriarcenaPageModule {}
