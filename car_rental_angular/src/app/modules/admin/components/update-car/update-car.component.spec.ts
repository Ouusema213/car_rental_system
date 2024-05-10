import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCarComponent } from './update-car.component';

describe('UpdateCarComponent', () => {
  let component: UpdateCarComponent;
  let fixture: ComponentFixture<UpdateCarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCarComponent]
    });
    fixture = TestBed.createComponent(UpdateCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
