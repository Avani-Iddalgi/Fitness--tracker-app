import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealCreateComponent } from './meal-create.component';

describe('MealCreateComponent', () => {
  let component: MealCreateComponent;
  let fixture: ComponentFixture<MealCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
