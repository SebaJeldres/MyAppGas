import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialVentasDistribuidoraPage } from './historial-ventas.page';

describe('HistorialVentasDistribuidoraPage', () => {
  let component: HistorialVentasDistribuidoraPage;
  let fixture: ComponentFixture<HistorialVentasDistribuidoraPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialVentasDistribuidoraPage]
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialVentasDistribuidoraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

