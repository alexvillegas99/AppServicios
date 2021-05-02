import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisServiciosPageRoutingModule } from './mis-servicios-routing.module';

import { MisServiciosPage } from './mis-servicios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisServiciosPageRoutingModule
  ],
  declarations: [MisServiciosPage]
})
export class MisServiciosPageModule {}
