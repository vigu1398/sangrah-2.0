import { ContextComponent } from './allocation-config/context/context.component';
import { AllocationConfigComponent } from './allocation-config/allocation-config.component';
import { AllocationListComponent } from './allocation-list/allocation-list.component';
import { AllocationsComponent } from './allocations.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllocatedUsersComponent } from './allocation-config/allocated-users/allocated-users.component';

const routes: Routes = [
  {
    path: '',
    component: AllocationsComponent,
    children: [
      {
        path: '',
        redirectTo: 'allocation-list',
        pathMatch: 'full'
      },
      {
        path: 'allocation-list',
        component: AllocationListComponent
      },
      {
        path: 'allocation-config/:id',
        component: AllocationConfigComponent
      },
      {
        path: 'allocation-config',
        component: AllocationConfigComponent
      }
      // {
      //   path: 'allocation-config',
      //   component: AllocationConfigComponent,
      //   children: [
      //     {
      //       path: 'context',
      //       component: ContextComponent
      //     },
      //     {
      //       path: 'users',
      //       component: AllocatedUsersComponent
      //     }
      //   ]
      // }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllocationsRoutingModule {}
