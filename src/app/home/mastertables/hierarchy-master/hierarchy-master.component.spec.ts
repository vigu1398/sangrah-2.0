import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyMasterComponent } from './hierarchy-master.component';

describe('HierarchyMasterComponent', () => {
  let component: HierarchyMasterComponent;
  let fixture: ComponentFixture<HierarchyMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchyMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
