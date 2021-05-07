import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyMenuComponent } from './property-menu.component';

describe('PropertyMenuComponent', () => {
  let component: PropertyMenuComponent;
  let fixture: ComponentFixture<PropertyMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
