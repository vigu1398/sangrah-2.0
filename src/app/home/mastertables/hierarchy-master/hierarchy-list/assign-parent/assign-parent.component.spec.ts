import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignParentComponent } from './assign-parent.component';

describe('AssignParentComponent', () => {
  let component: AssignParentComponent;
  let fixture: ComponentFixture<AssignParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssignParentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
