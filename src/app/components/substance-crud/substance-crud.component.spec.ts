import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstanceCrudComponent } from './substance-crud.component';

describe('SubstanceCrudComponent', () => {
  let component: SubstanceCrudComponent;
  let fixture: ComponentFixture<SubstanceCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubstanceCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubstanceCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
