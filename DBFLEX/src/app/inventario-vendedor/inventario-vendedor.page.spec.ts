import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventarioVendedorPage } from './inventario-vendedor.page';

describe('InventarioVendedorPage', () => {
  let component: InventarioVendedorPage;
  let fixture: ComponentFixture<InventarioVendedorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioVendedorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
