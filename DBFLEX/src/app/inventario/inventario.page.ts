import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../service/inventario.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {
  productos: any[] = [];
  productoSeleccionado: any = { id: '', nombre: '', precio: 0, cantidad: 0, categoria: '' };
  categorias: string[] = [
    'Frutas y Verduras', 'Carnes', 'Lácteos', 'Panadería', 'Bebidas',
    'Cereales', 'Limpieza', 'Cuidado Personal', 'Electrónica', 'Ropa',
    'Juguetes', 'Congelados', 'Vinos y Licores'
  ];

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
    });
  }

  onRefresh(event: any) {
    this.obtenerProductos();
    event.target.complete();
  }

  guardarProducto() {
    if (!this.productoSeleccionado.nombre || !this.productoSeleccionado.precio || !this.productoSeleccionado.cantidad || !this.productoSeleccionado.categoria) {
      this.mostrarAlerta('Todos los campos son obligatorios');
      return;
    }

    if (this.productoSeleccionado.precio <= 0 || this.productoSeleccionado.cantidad <= 0) {
      this.mostrarAlerta('El precio y la cantidad deben ser mayores a cero');
      return;
    }

    if (this.productoSeleccionado.id) {
      this.inventarioService.actualizarProducto(this.productoSeleccionado.id, this.productoSeleccionado)
        .subscribe(() => {
          this.obtenerProductos();
          this.limpiarFormulario();
        });
    } else {
      this.inventarioService.agregarProducto(this.productoSeleccionado)
        .subscribe((nuevoProducto) => {
          this.productos.push(nuevoProducto);
          this.limpiarFormulario();
        });
    }
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  editarProducto(producto: any) {
    this.productoSeleccionado = { ...producto };
  }

  eliminarProducto(id: number) {
    this.inventarioService.eliminarProducto(id).subscribe(() => {
      this.obtenerProductos();
    });
  }

  limpiarFormulario() {
    this.productoSeleccionado = { id: '', nombre: '', precio: 0, cantidad: 0, categoria: '' };
  }
}
