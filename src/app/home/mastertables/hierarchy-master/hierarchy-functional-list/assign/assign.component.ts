/* import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterTablesService } from 'src/app/services/master-tables.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { ChildFunComponent } from './child/child.component';
import { Assign, NewItem, Item } from '../../../master-data';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss']
})
export class AssignComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private masterService: MasterTablesService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  public activeIndex: number;
  name: string = '';
  description: string = '';
  data: any;
  record: any;
  childRecord: any;
  childData: any;
  list: any;
  childList: any;
  ref_parent: number;
  ref_child: number;
  binding1: any;
  binding2: any;
  returnedData: any;
  hieData: any;
  hieChild: any;
  assignChild: any;
  last: Assign[] = [];
  parentChildrens: any[] = [];
  childChildrens: any[] = [];
  filterList: any[] = [];
  refData: any;

  ngOnInit() {
    this.masterService.getMasterFunctionalList().subscribe(result => {
      this.data = result;
      this.masterService.getMasterFunctionalList().subscribe((res: any) => {
        this.refData = res;


        this.masterService.getFunctionalHierarchy().subscribe(res => {
          this.hieData = res;

          let id = this.route.snapshot.paramMap.get('id');
          this.hieChild = this.hieData.find(item => {
            return item._id == id
          })
          if (this.hieChild) {
            if (this.hieChild.ref_parent) {
              const ref_parent = this.hieChild.ref_parent;
              this.binding1 = this.data.find(item => {
                return item._id == ref_parent
              })
              this.getId(this.binding1)
              for (var i = 0; i < this.data.length; i++) {
                if (this.data[i]._id == ref_parent) {
                  this.data[i].isDisabled = false;
                } else {
                  this.data[i].isDisabled = true;
                }
              }
            } if (this.hieChild.ref_child) {

              const ref_child = this.hieChild.ref_child;
              this.binding2 = this.refData.find(item => {
                return item._id == ref_child
              })

              for (var i = 0; i < this.refData.length; i++) {
                if (this.refData[i]._id == ref_child) {
                  this.refData[i].isDisabled = false;
                } else {
                  this.refData[i].isDisabled = true;
                }
              }
            }
            this.name = this.hieChild.name;
            this.description = this.hieChild.description;
          }
          else if (!this.hieChild) {
            var refChilds = this.hieData.map(e => e.ref_child)

            for (var i = 0; i < this.refData.length; i++) {
              for (var j = 0; j < refChilds.length; j++) {
                if (this.refData[i]._id == refChilds[j]) {
                  this.refData[i].isDisabled = true;
                }
              }
            }
          }
        });
      });
    });
  }

  getId(event) {
    for (var i = 0; i < event.children.length; i++) {
      if (event.children[i].children)
        for (var j = 0; j < event.children[i].children.length; j++) {
          this.parentChildrens.push(event.children[i].children[j]);
        }
    }

    this.record = event.children;
    this.ref_parent = event._id;
    this.childData = [];
    this.binding2 = [];
    this.childList = [];

    if (this.hieChild) {
      this.returnedData = this.refData.find(item => {
        return item._id == this.hieChild.ref_child
      })
      this.childChildrens = this.returnedData.children.map(e => e._id)
      this.getChildId(this.returnedData);
      this.filterList = this.childChildrens.filter(el => {
        return this.parentChildrens.indexOf(el) < 0;
      });
    }
    else {
      this.returnedData = [];
    }
  }

  getData(i, user) {
    this.activeIndex = i;
    this.childRecord = user;
    // this.list = [];
    // this.childData = [];
    let item = this.last.find(e => e._id == user._id)
    if (item) {
      this.childList = item.children;
      if (this.hieChild) {
        this.list = this.returnedData.children.filter(e => {
          return this.filterList.indexOf(e._id) > -1
        });
      }
      else {
        this.list = this.binding2.children.filter(e => {
          return this.filterList.indexOf(e._id) > -1
        });
      }
      this.list = [...this.childList, ...this.list]
      if (this.hieChild)
        this.getChildId(this.returnedData);
    } else {
      if (user.children) {
        this.childList = this.returnedData.children.filter(e => {
          return user.children.indexOf(e._id) > -1
        });
      } else {
        this.childList = [];
      }

      this.list = this.binding2.children.filter(e => {
        return this.filterList.indexOf(e._id) > -1
      });
      if (this.hieChild) {
        this.list = [...this.childList, ...this.list]
        this.getChildId(this.returnedData);
      }
    }
  }

  getChildId(event) {
    this.binding2 = event;
    if (!this.hieChild) {
      this.childChildrens = this.binding2.children.map(e => e._id)
      this.filterList = this.childChildrens.filter(el => {
        return this.parentChildrens.indexOf(el) < 0;
      });
    }
    if (!this.list)
      this.list = event.children;
    this.ref_child = event._id;

    for (var i = 0; i < this.list.length; i++) {
      for (var k = 0; k < this.childList.length; k++) {
        if (this.list[i]._id == this.childList[k]._id) {
          this.list[i].isChecked = true;
          break;
        } else {
          this.list[i].isChecked = false;
        }
      }
    }
  }

  chooseValue() {
    const dialogRef = this.dialog.open(ChildFunComponent, {
      panelClass: 'child',
      data: {
        selectedList: this.list,
        child: this.filterList
      }
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.childList = res.selectedList;
        this.filterList = res.child;

        let child: Assign = {
          ref_id: this.childRecord.ref_id,
          ref_type: this.childRecord.ref_type,
          ref_value: this.childRecord.ref_value,
          _id: this.childRecord._id,
          children: this.childList
        }

        if (!this.hieChild) {
          for (var i = 0; i < this.binding1.children.length; i++) {
            if (this.binding1.children[i]._id == child._id) {
              this.binding1.children[i] = child;
            }
          }
        }
        this.last = this.last.filter(e => {
          return e._id != child._id
        })
        this.last.push(child);
      }
    });
  }

  key(event) {
    if (event.which == 32 && event.target.value.length == 0) {
      event.preventDefault();
    }
  }

  done() {
    if (this.name.length == 0) {
      this.toastr.warning('please enter Name');
    }
    else if (this.description.length == 0) {
      this.toastr.warning('please enter Description');
    }
    else {
      if (this.childList) {
        this.last.forEach(el => {
          el.children = el.children.map(elem => elem._id)
        })
        if (this.hieChild) {
          let item: Item = {
            _id: this.hieChild._id,
            name: this.hieChild.name,
            description: this.hieChild.description,
            ref_type: this.hieChild.ref_type,
            ref_parent: this.hieChild.ref_parent,
            ref_child: this.hieChild.ref_child,
            createdBy: this.hieChild.createdBy,
            modifiedBy: this.hieChild.modifiedBy,
            children: this.last
          }
          this.masterService.updateGeoHierarchy(item).subscribe((response: any) => {
            this.toastr.success(response.message);
          })
        }
        else {
          let newItem: NewItem = {
            name: this.name,
            description: this.description,
            ref_type: 'functional',
            ref_parent: this.ref_parent,
            ref_child: this.ref_child,
            children: this.last
          }
          this.masterService.updateGeoHierarchy(newItem).subscribe((response: any) => {
            this.toastr.success(response.message);
          })
        }
      }
    }
  }

  goBack() {
    window.history.back();
  }
}
 */