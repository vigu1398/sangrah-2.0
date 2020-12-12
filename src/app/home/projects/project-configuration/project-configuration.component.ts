import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../services/projects.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SelectListComponent } from './select-list/select-list.component';
import { Item } from '../projects-data';
import { ToastrService } from 'ngx-toastr';
import _ from 'underscore';
import { SelectQuestionComponent } from './select-question/select-question.component';
@Component({
  selector: 'app-project-configuration',
  templateUrl: './project-configuration.component.html',
  styleUrls: ['./project-configuration.component.scss']
})
export class ProjectConfigurationComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private dialogBox: MatDialog,
    private toastr: ToastrService
  ) { }

  list: any;
  data: any;
  selectOneQList: any;
  choices: any;
  showSelectList: boolean = false;
  num: number;
  child: string;
  status = 'Draft';
  btnDeploy = 'DEPLOY';
  title = '';
  // projectList: any;

  ngOnInit() {
    /* this.projectsService.getData().subscribe(res => {
      this.projectList = res;
    }) */

    let id = this.route.snapshot.paramMap.get('id');
    this.projectsService.getProjectInfo(id).subscribe(res => {
      this.list = res;
      this.status = this.list.status;
      if(_.contains(['Draft', 'Inactive'], this.status)){
        this.btnDeploy = 'DEPLOY';
      } else{
        this.btnDeploy = 'UNDEPLOY';
      }
      this.choices = (this.list.choices) ? this.list.choices : {}
      this.data = Object.values(this.list.parsed);
      this.title = this.data.splice(0, 1)[0].title;
      let i = 0;
      this.data.forEach(e => {
        if (!['select one','select all that apply'].includes(e.type)) 
          delete e.isSelect;
        if (!['select one','select all that apply','text','integer','geopoint','photo','decimal','date'].includes(e.type))
          delete e.editable;
        if (!['select one','text','integer'].includes(e.type))
          delete e.searchable;

        if (e.type == 'select one') {
          i++;
          if (i > 1) {
            if (!e.cascade)
            if (e.choice_filter) 
              e.cascade = e.choice_filter.split('${').pop().split('}')[0];
            else
              e.cascade = "select";
          }
        }
        if (['select one','select all that apply','text','integer','geopoint','photo','decimal','date'].includes(e.type) && !e.hasOwnProperty('editable'))
          e.editable = true;
        if (['select one','text','integer'].includes(e.type) && !e.hasOwnProperty('searchable'))
          e.searchable = false;
        if ((e.type == 'select one' || e.type == 'select all that apply') && !e.isSelect)
          e.isSelect = "select";
        if (e.label && typeof e.label == 'object') {
          if (!e.label.default)
            e.label = e.label[Object.keys(e.label)[0]]
        }
      });

      this.selectOneQList = this.data.filter(q => q.type == 'select one');
    });
  }

  getId(event) {
    this.projectsService.getProjectInfo(event.value).subscribe(res => {
      this.list = res;
      this.choices = (this.list.choices) ? this.list.choices : {}
      this.data = Object.values(this.list.parsed);
      this.data.splice(0, 1);
      this.data.forEach(e => {
        if ((e.type == 'select one' || e.type == 'select all that apply') && !e.isSelect)
          e.isSelect = "select";
      });
    });
  }

  selectQuestion(i) {
    const dialogRef = this.dialogBox.open(SelectQuestionComponent, {
      width: '55%',
      height: '45%',
      panelClass: 'select-list-class',
      data: {
        default: this.data[i],
        itemset: '',
        list: this.selectOneQList,
        id: this.num
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        if (data.id) {
        this.data[i].cascade = data.list;
        if (data.itemset && data.itemset.trim().length > 0)
        this.data[i].choice_filter = `${data.itemset}=\${${data.id}}`;
        } else
        this.data[i].cascade = null;
      }
    });
  }

  selectList(i) {
    const dialogRef = this.dialogBox.open(SelectListComponent, {
      width: '55%',
      height: '55%',
      panelClass: 'select-list-class',
      data: {
        default: this.choices[this.data[i].itemset] || [],
        list: this.child,
        id: this.num
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.data[i].isSelect = data.list;
        if (data.id) {
          this.data[i].datakey = {
            key: data.id,
            name: data.list
          }
          this.selectOneQList.forEach(d => {
            if (this.data[i].name == d.cascade)
            d.choice_filter = `${data.list}=` + (d.choice_filter)?d.choice_filter.split('=').pop():`\${${d.cascade}}`;
          });
        }else
        this.data[i].datakey = null;
      }
    });
  }

  searchItem(event, i) {
    if (event.target.checked) {
      this.data[i].searchable = true;
    }
    else {
      this.data[i].searchable = false;
    }
  }

  editItem(event, i) {
    if (event.target.checked) {
      this.data[i].editable = false;
    }
    else {
      this.data[i].editable = true;
    }
  }

  save() {
    let keys = Object.keys(this.list.parsed);
    let newOptions = {};
    keys.forEach((k, i) => {
      if (i == 0)
        newOptions[k] = this.list.parsed[k];
      else
        newOptions[k] = this.data[i - 1];
    })
    let list: Object = {
      _id: this.list._id,
      newOptions
    }
    this.projectsService.updateData(list).subscribe((res: any) => {
      if (res) {
        this.toastr.success(res.message);
      }
    }, err => {
      this.toastr.error(err.error.message || 'Network Unavailable. Please try again later.');
    });
  }

  deploy() {
    let stat = 'Draft';
    let btnd = this.btnDeploy;
    if(_.contains(['Draft', 'Inactive'], this.status)){
      this.save();
      stat = 'Active';
      this.btnDeploy = 'UNDEPLOY';
    } else{
      stat = 'Inactive';
      this.btnDeploy = 'DEPLOY';
    }
    this.projectsService.updateData({ _id: this.list._id, status: stat}).subscribe((res: any) => {
      if (res) {
        this.status = stat;
        this.list.status = this.status;
        this.toastr.success(res.message);
      }
    }, err => {
      this.btnDeploy = btnd;
      this.toastr.error(err.error.message || 'Network Unavailable. Please try again later.');
    });
  }

  goBack() {
    window.history.back();
    // this.router.navigate(['/home/projects/project-details']);
  }
  goTo() {
    this.router.navigate(['/home/allocations/allocation-config']);
  }

}
