import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSrcComponent } from './upload-src.component';

describe('UploadSrcComponent', () => {
  let component: UploadSrcComponent;
  let fixture: ComponentFixture<UploadSrcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadSrcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
