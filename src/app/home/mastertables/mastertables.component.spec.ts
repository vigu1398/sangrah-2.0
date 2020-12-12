import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastertablesComponent } from './mastertables.component';

describe('MastertablesComponent', () => {
  let component: MastertablesComponent;
  let fixture: ComponentFixture<MastertablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastertablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastertablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
