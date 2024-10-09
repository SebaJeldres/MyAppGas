import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformacionVehiculoPage } from './informacion-vehiculo.page';

describe('InformacionVehiculoPage', () => {
  let component: InformacionVehiculoPage;
  let fixture: ComponentFixture<InformacionVehiculoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionVehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
