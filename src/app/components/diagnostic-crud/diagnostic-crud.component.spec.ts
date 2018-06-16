import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticCrudComponent } from './diagnostic-crud.component';

describe('DiagnosticCrudComponent', () => {
  let component: DiagnosticCrudComponent;
  let fixture: ComponentFixture<DiagnosticCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
