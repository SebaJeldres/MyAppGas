import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CuentaUsuarioPage } from './cuenta-usuario.page';

describe('CuentaUsuarioPage', () => {
  let component: CuentaUsuarioPage;
  let fixture: ComponentFixture<CuentaUsuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
