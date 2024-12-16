import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventarioVendedorPage } from './inventario-vendedor.page';

const routes: Routes = [
  {
    path: '',
    component: InventarioVendedorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventarioVendedorPageRoutingModule {}
