import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventarioVendedorPageRoutingModule } from './inventario-vendedor-routing.module';

import { InventarioVendedorPage } from './inventario-vendedor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventarioVendedorPageRoutingModule
  ],
  declarations: [InventarioVendedorPage]
})
export class InventarioVendedorPageModule {}
