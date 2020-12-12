import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-allocated-users',
  templateUrl: './allocated-users.component.html',
  styleUrls: ['./allocated-users.component.scss']
})
export class AllocatedUsersComponent implements OnInit {
  public showAddUsers = false;

  users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Joy V' },
    { id: 3, name: 'John V' },
    { id: 4, name: 'Shiv Doe' },
    { id: 5, name: 'Johnny Doe' },
    { id: 6, name: 'John S' },
    { id: 7, name: 'Ani R' },
    { id: 8, name: 'Sunil k' },
    { id: 9, name: 'John Doe' },
    { id: 10, name: 'aa Doe' },
    { id: 11, name: 'John Doe' },
    { id: 12, name: 'ddd Doe' },
    { id: 13, name: 'John ddd' },
    { id: 14, name: 'Johddn cddd' }
  ];

  constructor() {}

  ngOnInit() {}
  onDelete(user) {
    this.users.splice(this.users.indexOf(user), 1);
  }
  addUsers() {
    this.showAddUsers = !this.showAddUsers;
  }
}
