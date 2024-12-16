import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-vendedor',
  templateUrl: './home-vendedor.page.html',
  styleUrls: ['./home-vendedor.page.scss'],
})
export class HomeVendedorPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cerrarSesion() {
    this.router.navigate(['/inicio']);
    console.log('Cerrando sesión...');
  }

}
