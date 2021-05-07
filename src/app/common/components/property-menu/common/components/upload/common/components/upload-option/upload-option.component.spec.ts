import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadOptionComponent } from './upload-option.component';

describe('UploadOptionComponent', () => {
  let component: UploadOptionComponent;
  let fixture: ComponentFixture<UploadOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
