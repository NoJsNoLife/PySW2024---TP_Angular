import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Punto5formComponent } from './punto5form.component';

describe('Punto5formComponent', () => {
  let component: Punto5formComponent;
  let fixture: ComponentFixture<Punto5formComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Punto5formComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Punto5formComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
