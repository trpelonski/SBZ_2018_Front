import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCrudComponent } from './patient-crud.component';

describe('PatientCrudComponent', () => {
  let component: PatientCrudComponent;
  let fixture: ComponentFixture<PatientCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
