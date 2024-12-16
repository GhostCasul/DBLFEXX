import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../service/inventario.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-inventario-vendedor',
  templateUrl: './inventario-vendedor.page.html',
  styleUrls: ['./inventario-vendedor.page.scss'],
})
export class InventarioVendedorPage implements OnInit {
  productos: any[] = [];
  productosPorCategoria: any = {};
  categorias: string[] = [];

  constructor(
    private inventarioService: InventarioService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.inventarioService.obtenerProductos().subscribe((data) => {
      this.productos = data;
      this.organizarProductosPorCategoria();
    });
  }

  organizarProductosPorCategoria() {
    this.productosPorCategoria = this.productos.reduce((acc, producto) => {
      const categoria = producto.categoria || 'Sin Categoría';
      if (!acc[categoria]) {
        acc[categoria] = [];
        this.categorias.push(categoria);
      }
      acc[categoria].push(producto);
      return acc;
    }, {});
  }

  onRefresh(event: any) {
    this.obtenerProductos();
    event.target.complete();
  }
}
