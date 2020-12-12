import { BootstrapModule } from './../bootstrap.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';

@NgModule({
  declarations: [HomeComponent, NavbarComponent, ProfileComponent, ChangePasswordComponent],
  imports: [CommonModule, HomeRoutingModule, BootstrapModule]
})
export class HomeModule {}
