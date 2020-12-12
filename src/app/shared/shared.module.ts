import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchboxComponent } from './components/searchbox/searchbox.component';
import { ListboxComponent } from './components/listbox/listbox.component';
import { FilterPipe } from './pipes/filter.pipe';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { AngularMaterialComponentsModule } from '../angular-material-components/angular-material-components.module';

@NgModule({
  declarations: [SearchboxComponent, ListboxComponent, FilterPipe, DialogBoxComponent],
  imports: [CommonModule,
    AngularMaterialComponentsModule],
  exports: [SearchboxComponent, ListboxComponent],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
