import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterGeographyListComponent } from './master-geography-list.component';

describe('MasterGeographyListComponent', () => {
  let component: MasterGeographyListComponent;
  let fixture: ComponentFixture<MasterGeographyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterGeographyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterGeographyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
