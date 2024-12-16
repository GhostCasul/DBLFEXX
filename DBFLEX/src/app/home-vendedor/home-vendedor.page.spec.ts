import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeVendedorPage } from './home-vendedor.page';

describe('HomeVendedorPage', () => {
  let component: HomeVendedorPage;
  let fixture: ComponentFixture<HomeVendedorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeVendedorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
