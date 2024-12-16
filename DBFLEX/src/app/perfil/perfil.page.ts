import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario = {
    nombre: 'Juan Pérez',
    email: 'Juan@gmail.com',
    telefono: '+569 3322 4213',
    direccion: 'Av. Siempre Viva 742',
    fechaNacimiento: '1995-05-15'
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  cerrarSesion() {
    this.router.navigate(['/inicio']);
    console.log('Cerrando sesión...');
  }

  volver() {
    this.router.navigate(['/home']);
  }

}
