import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CuentaRepartidorPage } from './cuenta-repartidor.page';

describe('CuentaRepartidorPage', () => {
  let component: CuentaRepartidorPage;
  let fixture: ComponentFixture<CuentaRepartidorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaRepartidorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
