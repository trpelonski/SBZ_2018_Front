import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimptomiCrudComponent } from './simptomi-crud.component';

describe('SimptomiCrudComponent', () => {
  let component: SimptomiCrudComponent;
  let fixture: ComponentFixture<SimptomiCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimptomiCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimptomiCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
