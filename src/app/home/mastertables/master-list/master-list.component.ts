import { Component, OnInit } from '@angular/core';
import { MasterTablesService } from '../../../services/master-tables.service';


@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.scss']
})
export class MasterListComponent implements OnInit {

  public selectedItem;
  public activeIndex = 0;
  data: any;
  record: any;
  fieldName: string;

  constructor(private masterService: MasterTablesService) { }

  ngOnInit() {
    /* this.masterService.getMasterFunctionalList().subscribe(result => {
      this.data = result;
      //console.log("TCL: HierarchyMasterComponent -> ngOnInit -> this.data", this.data)
    }) */
  }

  /* getData(id: number, i: number, fieldName: string) {
    this.activeIndex = i;
    this.fieldName = fieldName;
    if (id) {
      this.masterService.getFunctionalRecord(id).subscribe((response) => {
        console.log(response);
        this.record = response;
      })
    }
  } */

}
