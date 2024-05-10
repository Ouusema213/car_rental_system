import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCarComponent } from './search-car.component';

describe('SearchCarComponent', () => {
  let component: SearchCarComponent;
  let fixture: ComponentFixture<SearchCarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchCarComponent]
    });
    fixture = TestBed.createComponent(SearchCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
