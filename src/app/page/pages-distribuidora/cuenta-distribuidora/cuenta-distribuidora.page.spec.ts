import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CuentaDistribuidoraPage } from './cuenta-distribuidora.page';

describe('CuentaDistribuidoraPage', () => {
  let component: CuentaDistribuidoraPage;
  let fixture: ComponentFixture<CuentaDistribuidoraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaDistribuidoraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
