import { Component, OnInit } from '@angular/core';
import { MasterTablesService } from '../../../services/master-tables.service';

@Component({
  selector: 'app-hierarchy-master',
  templateUrl: './hierarchy-master.component.html',
  styleUrls: ['./hierarchy-master.component.scss']
})
export class HierarchyMasterComponent implements OnInit {

  public selectedItem;
  public activeIndex = 0;
  data: any;
  record: any;

  constructor(private masterService: MasterTablesService) { }

  ngOnInit() {
    this.masterService.getMasterGeoList().subscribe(result => {
      this.data = result;
    })
  }

  getData(id, i) {
    this.activeIndex = i;
    if (id) {
      this.masterService.getGeoRecord(id).subscribe((response) => {
        console.log(response);
        this.record = response;
      })
    }
  }

}

