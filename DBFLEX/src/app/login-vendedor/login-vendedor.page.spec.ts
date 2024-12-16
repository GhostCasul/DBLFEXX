import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginVendedorPage } from './login-vendedor.page';

describe('LoginVendedorPage', () => {
  let component: LoginVendedorPage;
  let fixture: ComponentFixture<LoginVendedorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginVendedorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
