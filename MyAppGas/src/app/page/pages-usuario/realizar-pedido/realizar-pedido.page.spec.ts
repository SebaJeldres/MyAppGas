import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RealizarPedidoPage } from './realizar-pedido.page';

describe('RealizarPedidoPage', () => {
  let component: RealizarPedidoPage;
  let fixture: ComponentFixture<RealizarPedidoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizarPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
