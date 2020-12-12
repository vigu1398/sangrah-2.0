import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialComponentsModule } from 'src/app/angular-material-components/angular-material-components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MastertablesRoutingModule } from './mastertables-routing.module';
import { MastertablesComponent } from './mastertables.component';
import { MasterListComponent } from './master-list/master-list.component';
import { HierarchyMasterComponent } from './hierarchy-master/hierarchy-master.component';
import { InputItemComponent } from './master-list/input-item/input-item.component';
import { MastertablesTabComponent } from './mastertables-tab/mastertables-tab.component';
import { MasterFunctionalListComponent } from './master-list/master-functional-list/master-functional-list.component';
import { MasterGeographyListComponent } from './master-list/master-geography-list/master-geography-list.component';
import { DialogBoxComponent } from 'src/app/shared/dialog-box/dialog-box.component';
import { HierarchyListComponent } from './hierarchy-master/hierarchy-list/hierarchy-list.component';
import { AssignParentComponent } from './hierarchy-master/hierarchy-list/assign-parent/assign-parent.component';
import { ChildComponent } from './hierarchy-master/hierarchy-list/assign-parent/child/child.component';
// import { HierarchyFunctionalListComponent } from './hierarchy-master/hierarchy-functional-list/hierarchy-functional-list.component';
// import { HierarchyGeographyListComponent } from './hierarchy-master/hierarchy-geography-list/hierarchy-geography-list.component';
// import { AssignParentComponent } from './hierarchy-master/hierarchy-geography-list/assign-parent/assign-parent.component';
// import { ChildComponent } from './hierarchy-master/hierarchy-geography-list/assign-parent/child/child.component';
// import { AssignComponent } from './hierarchy-master/hierarchy-functional-list/assign/assign.component';
// import { ChildFunComponent } from './hierarchy-master/hierarchy-functional-list/assign/child/child.component';

@NgModule({
  declarations: [
    MastertablesComponent,
    MasterListComponent,
    HierarchyMasterComponent,
    InputItemComponent,
    MastertablesTabComponent,
    MasterFunctionalListComponent,
    MasterGeographyListComponent,
    HierarchyListComponent,
    AssignParentComponent,
    ChildComponent,
    /* HierarchyFunctionalListComponent,
    HierarchyGeographyListComponent,
    ChildComponent,
    AssignComponent,
    ChildFunComponent */
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [CommonModule, FormsModule, MastertablesRoutingModule, SharedModule, AngularMaterialComponentsModule],
  entryComponents: [DialogBoxComponent, ChildComponent] //, ChildFunComponent]
})
export class MastertablesModule { }
