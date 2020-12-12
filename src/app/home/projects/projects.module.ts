import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialComponentsModule } from '../../angular-material-components/angular-material-components.module';
import { ProjectsComponent } from './projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectConfigurationComponent } from './project-configuration/project-configuration.component';
import { ImportProjectComponent } from './project-details/import-project/import-project.component';
import { SelectListComponent } from './project-configuration/select-list/select-list.component';
import { MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SelectQuestionComponent } from './project-configuration/select-question/select-question.component';

@NgModule({
  declarations: [ProjectsComponent, ProjectDetailsComponent, ProjectConfigurationComponent, ImportProjectComponent, SelectListComponent, SelectQuestionComponent],
  imports: [CommonModule, ProjectsRoutingModule, FormsModule, AngularMaterialComponentsModule, MatDialogModule, SharedModule],
  entryComponents: [SelectListComponent, ImportProjectComponent, SelectQuestionComponent]
})
export class ProjectsModule { }
