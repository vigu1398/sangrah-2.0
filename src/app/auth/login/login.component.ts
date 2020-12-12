import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
// import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  user: any = {};
  authenticate$: any;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.user = {
      email: '',
      password: ''
    };
  }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.authService.isLoggedIn().subscribe(
        (result) => {
          this.router.navigate(['/home'], { replaceUrl: true });
        },
        (err) => {
          this.toastr.error(err.error.message || 'Network Unavailable. Please try again later.');
          console.error(err);
        }
      );
    }
  }

  authenticate(userCredentials) {
    
    // this.router.navigate(['/home'], { replaceUrl: true });
    this.authenticate$ = this.authService
      .authenticate(userCredentials)
      .pipe(
        switchMap(data => {
          this.authService.setToken(data["token"]);
          return this.authService.getMe();
        })
      )
      .subscribe(
        (result:any) => {
          this.authService.setCurrentUser(result.user);
          this.router.navigate(['/home'], { replaceUrl: true });
        },
        (err) => {
          this.toastr.error(err.error.message || 'Network Unavailable. Please try again later.');
          console.error(err);
        }
      );
  }

  /* public signinWithGoogle () {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
 
    this.authService.signIn(socialPlatformProvider)
    .then((userData) => {
       //on success
       //this will return user data from google. What you need is a user token which you will send it to the server
       this.authenticate(userData.idToken);

       //the server api
       this.http.post("url to google login in your rest api",
      {
         token: userCredentials
      }
    ).subscribe(
      onSuccess => {
         //login was successful
         //save the token that you got from your REST API in your preferred location i.e. as a Cookie or LocalStorage as you do with normal login
      }, onFail => {
         //login was unsuccessful
         //show an error message
      }
   );
    });
 } */
}
