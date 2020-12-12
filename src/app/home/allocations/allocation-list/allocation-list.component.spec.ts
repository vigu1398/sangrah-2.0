import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationListComponent } from './allocation-list.component';

describe('AllocationListComponent', () => {
  let component: AllocationListComponent;
  let fixture: ComponentFixture<AllocationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
