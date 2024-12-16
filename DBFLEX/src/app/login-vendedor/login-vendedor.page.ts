import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-login-vendedor',
  templateUrl: 'login-vendedor.page.html',
  styleUrls: ['login-vendedor.page.scss'],
})
export class LoginVendedorPage implements OnInit {
  usuarios: any[] = [];
  nombre: string = '';
  email: string = '';
  errorMessage: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data;
      console.log('Usuarios cargados:', this.usuarios);
    }, error => {
      console.error('Error al obtener usuarios', error);
    });
  }

  loginVendedor() {
    const usuarioValido = this.usuarios.find(usuario =>
      usuario.nombre.trim() === this.nombre.trim() && usuario.email.trim() === this.email.trim() && usuario.tipo === 'Vendedor'
    );

    if (usuarioValido) {
      this.router.navigate(['/home-vendedor']);
    } else {
      this.errorMessage = 'Nombre de usuario o correo incorrecto, o no eres un vendedor.';
    }
  }
}
