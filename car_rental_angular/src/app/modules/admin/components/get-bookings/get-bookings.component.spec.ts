import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBookingsComponent } from './get-bookings.component';

describe('GetBookingsComponent', () => {
  let component: GetBookingsComponent;
  let fixture: ComponentFixture<GetBookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetBookingsComponent]
    });
    fixture = TestBed.createComponent(GetBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
