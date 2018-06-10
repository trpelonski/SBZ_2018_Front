import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotvrdaComponent } from './potvrda.component';

describe('PotvrdaComponent', () => {
  let component: PotvrdaComponent;
  let fixture: ComponentFixture<PotvrdaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotvrdaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotvrdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
