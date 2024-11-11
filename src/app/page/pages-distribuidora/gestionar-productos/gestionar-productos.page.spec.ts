import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionarProductosPage } from './gestionar-productos.page';

describe('GestionarProductosPage', () => {
  let component: GestionarProductosPage;
  let fixture: ComponentFixture<GestionarProductosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
