import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationConfigComponent } from './allocation-config.component';

describe('AllocationConfigComponent', () => {
  let component: AllocationConfigComponent;
  let fixture: ComponentFixture<AllocationConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocationConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocationConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
