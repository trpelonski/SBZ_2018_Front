import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecenjeComponent } from './lecenje.component';

describe('LecenjeComponent', () => {
  let component: LecenjeComponent;
  let fixture: ComponentFixture<LecenjeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecenjeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecenjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
