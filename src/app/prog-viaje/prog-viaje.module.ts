import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgViajePageRoutingModule } from './prog-viaje-routing.module';

import { ProgViajePage } from './prog-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgViajePageRoutingModule
  ],
  declarations: [ProgViajePage]
})
export class ProgViajePageModule {}
