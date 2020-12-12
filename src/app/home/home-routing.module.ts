import { ProfileComponent } from './profile/profile.component';
import { MastertablesComponent } from './mastertables/mastertables.component';
import { HomeComponent } from './home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full'
      },
      {
        path: 'mastertables',
        loadChildren: () =>
          import('./mastertables/mastertables.module').then(
            (m) => m.MastertablesModule
          )
        // loadChildren: './mastertables/mastertables.module#MastertablesModule'
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('./projects/projects.module').then((m) => m.ProjectsModule)
      },
      {
        path: 'user-management',
        loadChildren: () =>
          import('./user-management/user-management.module').then(
            (m) => m.UserManagementModule
          )
      },
      {
        path: 'allocations',
        loadChildren: () =>
          import('./allocations/allocations.module').then(
            (m) => m.AllocationsModule
          )
      },
      {
        path: 'data-management',
        loadChildren: () =>
          import('./data-management/data-management.module').then(
            (m) => m.DataManagementModule
          )
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class HomeRoutingModule { }
