import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamadaPantallaFiltrosComponent } from './llamada-pantalla-filtros.component';

describe('LlamadaPantallaFiltrosComponent', () => {
  let component: LlamadaPantallaFiltrosComponent;
  let fixture: ComponentFixture<LlamadaPantallaFiltrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LlamadaPantallaFiltrosComponent]
    });
    fixture = TestBed.createComponent(LlamadaPantallaFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
