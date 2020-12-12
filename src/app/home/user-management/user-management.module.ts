import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { UsersListComponent } from './users-list/users-list.component';
import { GridModule, SortService, GroupService, ToolbarService, FilterService, PageService, PdfExportService, ExcelExportService, EditService, DetailRowService } from '@syncfusion/ej2-angular-grids';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

@NgModule({
  declarations: [UserManagementComponent, UsersDetailsComponent, UsersListComponent],
  imports: [
    GridModule,
    DropDownListModule,
    CommonModule,
    UserManagementRoutingModule,
    SharedModule
  ],
  providers: [
    SortService,
    GroupService,
    FilterService,
    PageService,
    PdfExportService,
    ExcelExportService,
    ToolbarService,
    EditService,
    DetailRowService
  ]
})
export class UserManagementModule { }
