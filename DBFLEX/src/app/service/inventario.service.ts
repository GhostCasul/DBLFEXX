import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = 'http://localhost:3001/api/inventario';
  private apiCategoriasUrl = 'http://localhost:3001/api/categorias';

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  obtenerCategorias(): Observable<any> {
    return this.http.get<any>(this.apiCategoriasUrl);
  }

  agregarProducto(producto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, producto);
  }

  actualizarProducto(id: number, producto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, producto);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
