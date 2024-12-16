export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  tipo: 'Vendedor' | 'Admin';
}
