import { BootstrapModule } from './../../bootstrap.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule } from '@angular/forms';

import { AllocationsRoutingModule } from './allocations-routing.module';
import { AllocationsComponent } from './allocations.component';
import { AllocationListComponent } from './allocation-list/allocation-list.component';
import { AllocationConfigComponent } from './allocation-config/allocation-config.component';
import { ContextComponent } from './allocation-config/context/context.component';
import { AllocatedUsersComponent } from './allocation-config/allocated-users/allocated-users.component';
import { AddUsersComponent } from './allocation-config/allocated-users/add-users/add-users.component';
import { AddAllocationComponent } from './allocation-config/add-allocation/add-allocation.component';

@NgModule({
  declarations: [
    AllocationsComponent,
    AllocationListComponent,
    AllocationConfigComponent,
    ContextComponent,
    AllocatedUsersComponent,
    AddUsersComponent,
    AddAllocationComponent
  ],
  imports: [
    CommonModule,
    AllocationsRoutingModule,
    SharedModule,
    BootstrapModule,
    // AngularMultiSelectModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AllocationsModule {}
