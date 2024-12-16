import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {
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

  login() {
    this.usuarioService.login(this.email, this.nombre, 'Admin').subscribe(
      response => {
        console.log('Inicio de sesión exitoso', response);
        this.router.navigate(['/home']);
      },
      error => {
        this.errorMessage = error.error.error || 'Error en el inicio de sesión';
      }
    );
  }
}
