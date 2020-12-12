import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataManagementComponent } from '../data-management/data-management.component'; 
import { DataDetailsComponent } from './data-details/data-details.component';
import { DataConfigurationComponent } from '../data-management/data-configuration/data-configuration.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'data-details',
        pathMatch: 'full'
      },
      {
        path: 'data-details',
        component: DataDetailsComponent
      },
      {
        path: 'data-configuration/:id',
        component: DataConfigurationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataManagementRoutingModule { }
