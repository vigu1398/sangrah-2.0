import { BootstrapModule } from './bootstrap.module';
import { NgModule } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialComponentsModule } from './angular-material-components/angular-material-components.module'
import { ApiUrl } from '../app/url.config';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppCacheService } from './services/app-cache.service';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ProjectsService } from './services/projects.service';
import { httpInterceptorProviders } from './http-interceptors';
import { MasterTablesService } from './services/master-tables.service';
import { ProfileService } from './services/profile.service';
import { GridModule } from '@syncfusion/ej2-angular-grids';

// import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
// import { ButtonsModule } from 'ngx-bootstrap/buttons';

// import {
//   AuthService,
//   SocialLoginModule,
//   AuthServiceConfig,
//   GoogleLoginProvider
// } from 'angularx-social-login';
// import { getAuthServiceConfigs } from './home/socialloginConfig';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    }),
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    AngularMaterialComponentsModule,
    MatDialogModule,
    FormsModule,
    BootstrapModule,
    AngularMultiSelectModule,
    GridModule
    // SocialLoginModule
  ],
  providers: [AuthService,
    { provide: 'apiurl', useValue: ApiUrl },
    ProjectsService,
    MasterTablesService,
    ProfileService,
    httpInterceptorProviders,
    AppCacheService],
  bootstrap: [AppComponent]
})
export class AppModule { }
