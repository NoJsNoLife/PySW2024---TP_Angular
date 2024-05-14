import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Punto5ticketComponent } from './punto5ticket.component';

describe('Punto5ticketComponent', () => {
  let component: Punto5ticketComponent;
  let fixture: ComponentFixture<Punto5ticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Punto5ticketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Punto5ticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
