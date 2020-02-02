import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriaralarmePageRoutingModule } from './criaralarme-routing.module';

import { CriaralarmePage } from './criaralarme.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriaralarmePageRoutingModule
  ],
  declarations: [CriaralarmePage]
})
export class CriaralarmePageModule {}
