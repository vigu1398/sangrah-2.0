import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public showChangePassword = false;
  public user: any;
  private titlecase = "User";

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.profileService.getProfile().subscribe((res: any) => {
      this.user = res.user;
      // console.log(this.user);
    })
  }
  onUpdate() {
    console.log('profile updated');
  }
  changePassword() {
    // this.showChangePassword = !this.showChangePassword;
  }
}
