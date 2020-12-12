import { HierarchyMasterComponent } from './hierarchy-master/hierarchy-master.component';
import { MasterListComponent } from './master-list/master-list.component';
import { MastertablesComponent } from './mastertables.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterFunctionalListComponent } from './master-list/master-functional-list/master-functional-list.component';
import { MasterGeographyListComponent } from './master-list/master-geography-list/master-geography-list.component';
// import { HierarchyFunctionalListComponent } from './hierarchy-master/hierarchy-functional-list/hierarchy-functional-list.component';
// import { HierarchyGeographyListComponent } from './hierarchy-master/hierarchy-geography-list/hierarchy-geography-list.component';
// import { AssignParentComponent } from './hierarchy-master/hierarchy-geography-list/assign-parent/assign-parent.component';
// import { AssignComponent } from './hierarchy-master/hierarchy-functional-list/assign/assign.component';
import { AssignParentComponent } from './hierarchy-master/hierarchy-list/assign-parent/assign-parent.component';
import { HierarchyListComponent } from './hierarchy-master/hierarchy-list/hierarchy-list.component';

const routes: Routes = [
  {
    path: '',
    component: MastertablesComponent,
    children: [
      {
        path: '',
        redirectTo: 'master-list',
      },
      {
        path: 'master-list',
        component: MasterListComponent,
        children: [
          {
            path: '',
            redirectTo: 'master-functional-list',
            pathMatch: 'full'
          },
          {
            path: 'master-functional-list',
            component: MasterFunctionalListComponent
          },
          {
            path: 'master-geography-list',
            component: MasterGeographyListComponent
          }
        ]
      },
      {
        path: 'hierarchy-master',
        component: HierarchyListComponent
      },
      {
        path: 'hierarchy-master/assign/:id',
        component: AssignParentComponent
      }
    /*   {
        path: 'hierarchy-master',
        component: HierarchyMasterComponent,
        children: [
          {
            path: '',
            redirectTo: 'hierarchy-functional-list',
            pathMatch: 'full'
          },

          {
            path: 'hierarchy-functional-list',
            component: HierarchyFunctionalListComponent
          },
          {
            path: 'assign/:id',
            component: AssignComponent
          },
          {
            path: 'assign-geo/:id',
            component: AssignParentComponent
          },
          {
            path: 'hierarchy-geography-list',
            component: HierarchyGeographyListComponent
          }
        ]
      }, */
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastertablesRoutingModule { }
