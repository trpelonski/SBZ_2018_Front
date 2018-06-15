import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BolestiCrudComponent } from './bolesti-crud.component';

describe('BolestiCrudComponent', () => {
  let component: BolestiCrudComponent;
  let fixture: ComponentFixture<BolestiCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BolestiCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BolestiCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
