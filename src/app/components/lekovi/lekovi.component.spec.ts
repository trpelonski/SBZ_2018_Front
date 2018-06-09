import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LekoviComponent } from './lekovi.component';

describe('LekoviComponent', () => {
  let component: LekoviComponent;
  let fixture: ComponentFixture<LekoviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LekoviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LekoviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
