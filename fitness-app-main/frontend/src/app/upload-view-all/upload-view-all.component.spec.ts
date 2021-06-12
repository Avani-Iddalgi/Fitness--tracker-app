import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadViewAllComponent } from './upload-view-all.component';

describe('UploadViewAllComponent', () => {
  let component: UploadViewAllComponent;
  let fixture: ComponentFixture<UploadViewAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadViewAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
