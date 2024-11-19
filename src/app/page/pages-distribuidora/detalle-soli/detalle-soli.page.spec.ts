import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleSoliPage } from './detalle-soli.page';

describe('DetalleSoliPage', () => {
  let component: DetalleSoliPage;
  let fixture: ComponentFixture<DetalleSoliPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleSoliPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
