import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: any = {};
  showPswd: Boolean = false;
  constructor(private router: Router) {
    this.user = {
      firstName: '',
      LastName: '',
      email: '',
      password: ''
    };
  }

  ngOnInit() {}
  showPassword() {
    this.showPswd = !this.showPswd;
  }
  register(user) {}
}
