import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocatedUsersComponent } from './allocated-users.component';

describe('AllocatedUsersComponent', () => {
  let component: AllocatedUsersComponent;
  let fixture: ComponentFixture<AllocatedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocatedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
