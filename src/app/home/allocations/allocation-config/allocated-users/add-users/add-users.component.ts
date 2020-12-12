import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
  @Output() closeModal = new EventEmitter();

  public UserDetails = [
    {
      id: 1,
      name: 'Akash V',
      username: 'akashv',
      email: 'akashv@gmail.com',
      mobile: '123456789'
    },
    {
      id: 2,
      name: 'amit V',
      username: 'amitv',
      email: 'amitv@gmail.com',
      mobile: '123456789'
    },
    {
      id: 2,
      name: 'amit V',
      username: 'amitv',
      email: 'amitv@gmail.com',
      mobile: '123456789'
    },
    {
      id: 2,
      name: 'om V',
      username: 'amitv',
      email: 'amitv@gmail.com',
      mobile: '123456789'
    },
    {
      id: 2,
      name: 'shiv V',
      username: 'amitv',
      email: 'amitv@gmail.com',
      mobile: '123456789'
    },
    {
      id: 2,
      name: 'om V',
      username: 'amitv',
      email: 'amitv@gmail.com',
      mobile: '123456789'
    },
    {
      id: 2,
      name: 'shiv V',
      username: 'amitv',
      email: 'amitv@gmail.com',
      mobile: '123456789'
    },
    {
      id: 2,
      name: 'om V',
      username: 'amitv',
      email: 'amitv@gmail.com',
      mobile: '123456789'
    },
    {
      id: 2,
      name: 'shiv V',
      username: 'amitv',
      email: 'amitv@gmail.com',
      mobile: '123456789'
    },
    {
      id: 2,
      name: 'om V',
      username: 'amitv',
      email: 'amitv@gmail.com',
      mobile: '123456789'
    },
    {
      id: 2,
      name: 'shiv V',
      username: 'amitv',
      email: 'amitv@gmail.com',
      mobile: '123456789'
    },
    {
      id: 2,
      name: 'om V',
      username: 'amitv',
      email: 'amitv@gmail.com',
      mobile: '123456789'
    },
    {
      id: 2,
      name: 'shiv V',
      username: 'amitv',
      email: 'amitv@gmail.com',
      mobile: '123456789'
    }
  ];
  constructor() {}

  ngOnInit() {}
  onCloseModal() {
    this.closeModal.emit();
  }
  onAdd() {
    this.closeModal.emit();
  }
}
