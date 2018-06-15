import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LekoviCrudComponent } from './lekovi-crud.component';

describe('LekoviCrudComponent', () => {
  let component: LekoviCrudComponent;
  let fixture: ComponentFixture<LekoviCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LekoviCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LekoviCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
