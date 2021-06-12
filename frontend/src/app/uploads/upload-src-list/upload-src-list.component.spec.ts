import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSrcListComponent } from './upload-src-list.component';

describe('UploadSrcListComponent', () => {
  let component: UploadSrcListComponent;
  let fixture: ComponentFixture<UploadSrcListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadSrcListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSrcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
