import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterTablesService } from 'src/app/services/master-tables.service';

@Component({
  selector: 'app-hierarchy-list',
  templateUrl: './hierarchy-list.component.html',
  styleUrls: ['./hierarchy-list.component.scss']
})
export class HierarchyListComponent implements OnInit {

  constructor(
    private router: Router,
    private masterService: MasterTablesService
  ) { }

  record: any;
  projectSearch: string = '';

  ngOnInit() {
    this.masterService.getHierarchy().subscribe(res => {
      this.record = res;
    })
  }

  get data() {
    let response = this.record;
    if (this.projectSearch) {
      response = response.filter(e => {
        return e.name.toLowerCase().indexOf(this.projectSearch.toLowerCase()) >= 0;
      });
    }
    return response;
  }


  assignParent(id) {
    this.router.navigate(['/home/mastertables/hierarchy-master/assign', id]);
  }
}
