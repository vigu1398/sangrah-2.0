import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataManagementRoutingModule } from './data-management-routing.module';
import { DataManagementComponent } from './data-management.component';
import { DataDetailsComponent } from './data-details/data-details.component';
import { DataConfigurationComponent } from './data-configuration/data-configuration.component';
import { ImportDataComponent } from './data-details/import-data/import-data.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialComponentsModule } from '../../angular-material-components/angular-material-components.module';
import { MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { GridModule, SortService, GroupService, ToolbarService, FilterService, PageService, PdfExportService, ExcelExportService, EditService, DetailRowService } from '@syncfusion/ej2-angular-grids';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';


@NgModule({
  declarations: 
  [
    DataManagementComponent, 
    DataDetailsComponent, 
    DataConfigurationComponent, 
    ImportDataComponent
  ],
  imports: 
  [
    CommonModule,
    DataManagementRoutingModule,
    SharedModule,
    AngularMaterialComponentsModule,
    MatDialogModule,
    FormsModule,
    GridModule, 
    DropDownListModule
  ]

})
export class DataManagementModule { }
