import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProjectsService } from '../../../services/projects.service';
import { MatDialog } from '@angular/material';
import { ImportProjectComponent } from './import-project/import-project.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  constructor(private router: Router,
  private projectsService: ProjectsService,
  private dialogBox: MatDialog,
  private toastr: ToastrService
  ) { }
  
  public showImportProject = false;
  projectSearch: string;
  projectDetails: any;
  activeCount: number;
  index: number;
  private selectedId: any;
    
  ngOnInit() {
    
      this.projectsService.getData().subscribe((res:any) => {
        this.projectDetails = res;
        this.activeCount = res.filter(item => item.status.toLowerCase() == 'active' ).length;
        if (this.getProjectList().length) {
          let sel = this.getSelected();
          this.projectSearch = this.getSearchText();
          this.selectedId = sel.id;
          this.index = sel.index;
          // this.activeCount = this.projectDetails.filter(item => item.status.toLowerCase() == 'active' ).length;
          setTimeout(()=>{
            this.selectProject(this.selectedId, this.index);
            this.ngAfterViewInit();
            this.removeSelected();
          }, 800)
        }
      }, err => {
        this.toastr.error(err.error.message || 'Network Unavailable. Please try again later.');
      });
    // }
  }
    
  get filter() {
    let dataList = this.projectDetails;
    
    if (this.projectSearch) {
      dataList = dataList.filter(item => {
        return item.title.toLowerCase().indexOf(this.projectSearch.toLowerCase()) >= 0
      });
    }
    return dataList;
  }
    
  ngAfterViewInit(): void {
    if(this.index && this.index > 6) {
      let valueItem = document.getElementById('item-' + (this.index-3));
      if (valueItem)
      valueItem.scrollIntoView(true);
    }
  }

  importProject() {
    // this.showImportProject = !this.showImportProject;
    const dialogRef = this.dialogBox.open(ImportProjectComponent, {
      data: {

      }
    });
  }

  selectProject(id, i) {
    this.selectedId = id;
    this.index = i;
  }

  showProjectConfiguration(id, i) {
    this.selectedId = id;
    this.index = i;
    this.setProjectList();
    this.setSelected()
    this.setSearchText();
    this.router.navigate(['/home/projects/project-configuration/', id]);
  }

  setProjectList() {
    sessionStorage.setItem('projectList', JSON.stringify(this.projectDetails));
  }

  getProjectList() {
    return JSON.parse(sessionStorage.getItem('projectList') || "[]");
  }

  setSelected() {
    let sel = {id:this.selectedId, index:this.index}
    sessionStorage.setItem('selected', JSON.stringify(sel));
  }

  getSelected() {
    return JSON.parse(sessionStorage.getItem('selected'));
  }

  setSearchText() {
    sessionStorage.setItem('projectSearch', this.projectSearch || "");
  }

  getSearchText() {
    return sessionStorage.getItem('projectSearch');
  }

  removeSelected() {
    sessionStorage.removeItem('projectList');
    sessionStorage.removeItem('selected');
    sessionStorage.removeItem('projectSearch');
  }
}
