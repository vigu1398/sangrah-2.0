import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastertablesTabComponent } from './mastertables-tab.component';

describe('MastertablesTabComponent', () => {
  let component: MastertablesTabComponent;
  let fixture: ComponentFixture<MastertablesTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastertablesTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastertablesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
