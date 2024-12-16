import { UsuarioService } from './../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.page.html',
  styleUrls: ['./administracion.page.scss'],
})
export class AdministracionPage implements OnInit {

  usuarios: Usuario[] = [];
  usuario: Usuario = { id: 0, nombre: '', email: '', tipo: 'Vendedor' };
  isEditing: boolean = false;

  constructor(private usuarioService: UsuarioService, private alertController: AlertController) { }

  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuarioService.getUsuarios().subscribe((data: Usuario[]) => {
      this.usuarios = data;
    });
  }

  isEmailValid(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  }

  onSubmit() {
    if (!this.usuario.nombre || !this.usuario.email || !this.usuario.tipo) {
      this.presentAlert('Todos los campos son obligatorios.');
      return;
    }

    if (!this.isEmailValid(this.usuario.email)) {
      this.presentAlert('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    if (this.isEditing) {
      this.usuarioService.updateUsuario(this.usuario).subscribe(() => {
        this.loadUsuarios();
        this.resetForm();
      });
    } else {
      this.usuarioService.createUsuario(this.usuario).subscribe(() => {
        this.loadUsuarios();
        this.resetForm();
      });
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  onEdit(usuario: Usuario) {
    this.usuario = { ...usuario };
    this.isEditing = true;
  }

  onDelete(id: number) {
    this.usuarioService.deleteUsuario(id).subscribe(() => {
      this.loadUsuarios();
    });
  }

  resetForm() {
    this.usuario = { id: 0, nombre: '', email: '', tipo: 'Vendedor' };
    this.isEditing = false;
  }
}
