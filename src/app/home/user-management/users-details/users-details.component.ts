import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  goBack() {
    this.router.navigate(['/home/user-management/users-list']);
  }
}
