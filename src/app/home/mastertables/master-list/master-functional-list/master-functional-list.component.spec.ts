import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterFunctionalListComponent } from './master-functional-list.component';

describe('MasterFunctionalListComponent', () => {
  let component: MasterFunctionalListComponent;
  let fixture: ComponentFixture<MasterFunctionalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterFunctionalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterFunctionalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
