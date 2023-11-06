import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialPageComponent } from './historial-page.component';

describe('HistorialPageComponent', () => {
  let component: HistorialPageComponent;
  let fixture: ComponentFixture<HistorialPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialPageComponent]
    });
    fixture = TestBed.createComponent(HistorialPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
