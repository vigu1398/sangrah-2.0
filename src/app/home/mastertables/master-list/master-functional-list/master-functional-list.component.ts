import { Component, OnInit } from '@angular/core';
import { MasterTablesService } from '../../../../services/master-tables.service';
import { AddNew, Remove, RemoveChild, AddItem } from '../../master-data';
import { DialogBoxComponent } from 'src/app/shared/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-functional-list',
  templateUrl: './master-functional-list.component.html',
  styleUrls: ['./master-functional-list.component.scss']
})
export class MasterFunctionalListComponent implements OnInit {

  public selectedItem;
  public activeIndex = 0;
  length: number;
  data: any;
  record: any;
  list: any;
  fieldName: string;
  projectSearch: string;
  newValue: boolean;
  edit: boolean = false;
  message = '';
  listerror = '';
  message1 = '';
  inputName: string = '';
  inputId: number;
  removedItems: any[] = [];
  addedItems: any[] = [];
  newItem: boolean = false;
  binding: string = '';
  isSelected: boolean = false;
  toggle: boolean = false;


  constructor(private masterService: MasterTablesService,
    private dialogBox: MatDialog,
    private toastr: ToastrService,
    private route: Router) { }

  ngOnInit() {
    this.masterService.getMasterFunctionalList().subscribe(result => {
      this.data = result;
      this.length = this.data.length;
      let element = this.data[0];
      this.getData(element, 0);
    })
  }

  /* to get list children
  ........................ */
  getData(item, i: number) {
    if (this.isSelected) {
      const dialogRef = this.dialogBox.open(DialogBoxComponent, {
        width: '400px',
        panelClass: 'dialog-box',
        data: {
          btnMsg: 'Save',
          cancelMsg: 'Ignore',
          message:
            'Do you want to save changes'
        }
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          this.save();
          this.isSelected = false;
        } else {
          this.isSelected = false;
          let length = this.data.length;
          if (this.length != length) {
            this.data.pop();
          }
          this.getData(item, i);
        }
      });
    }
    else {
      this.list = item;
      this.activeIndex = i;
      this.fieldName = item.ref_value;
      this.removedItems = [];
      this.addedItems = [];
      /* if (item._id) {
        this.masterService.getFunctionalRecord(item._id).subscribe((response) => {
          this.record = response[0].children;
          this.list.children = response[0].children;
        })
      } else {
      } */
        this.record = item.children;
      this.edit = false;
    }
  }

  get filter() {
    let dataList = this.data;

    if (this.projectSearch) {
      dataList = dataList.filter(item => {
        return item.ref_value.toLowerCase().indexOf(this.projectSearch.toLowerCase()) >= 0
      });
    }
    return dataList;
  }

  /*to add new children to current list item  */
  addValueSave() {
    if (this.inputName.trim().length == 0) {
      return this.toastr.warning('Value cannot be empty');
    }
    if (!this.inputId || this.inputId.toString().trim().length == 0) {
      return this.toastr.warning('ID cannot be empty');
    }
    if (this.message.trim().length > 1 || this.message1.trim().length > 1) {
      return this.toastr.warning('Please resolve the error to save.');
    }
    let value: AddNew = {
      ref_type: this.list.ref_value,
      ref_value: this.inputName,
      ref_id: this.inputId
    }
    /* if (this.toggle == true) {
      this.list.children.push(value);
    }
    else {
      this.list.children.push(value);
    } */
    this.addedItems.push(value);
    this.record.push(value);

    this.newValue = !this.newValue;
    this.inputName = '';
    this.inputId = null;
    this.isSelected = true;
  }

  /* delete list items(childrens) */
  deleteValue(i: number) {
    const dialogRef = this.dialogBox.open(DialogBoxComponent, {
      width: '400px',
      panelClass: 'dialog-box',
      data: {
        btnMsg: 'Yes',
        cancelMsg: 'No',
        message:
          'Do you want to delete'
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        let removedEle = this.record.splice(i, 1);
        removedEle.forEach(function (item) { 
          item.del = true; 
          if (this.addedItems)
          this.addedItems = this.addedItems.filter((el) => el.ref_id != item.ref_id)
        });
        this.removedItems.push(...removedEle);
        /* let item: RemoveChild = {
          ref_value: this.list.ref_value,
          ref_type: this.list.ref_type,
          _id: this.list._id,
          children: [
            ...this.removedItems
          ]
        }
        this.list = item; */
        this.toastr.success('Removed');
      }
    });
  }

  addValueClose() {
    this.newValue = !this.newValue;
    this.inputName = '';
    this.inputId = null;
    this.message = '';
    this.message1 = '';
  }

  /* validation for adding new children to current list */
  newListValue(event) {
    let labels = this.data.map((item) => {
      return item.ref_value.toUpperCase();
    });
    const inputValue = event.target.value.toUpperCase();
    if (labels.indexOf(inputValue.trim()) >= 0) {
      return this.listerror = "Name already exists"
    }
    this.listerror = '';
  }

  newInputValue(event) {
    let labels = this.record.map((item) => {
      return item.ref_value.toUpperCase();
    });
    const inputValue = event.target.value.toUpperCase();
    if (labels.indexOf(inputValue.trim()) >= 0) {
      return this.message = "Name already exists"
    }
    this.message = '';
  }

  newInputId(event) {
    let label = this.record.map((item) => {
      return item.ref_id;
    });
    const value = event.target.value;
    if (label.indexOf(value.trim()) >= 0) {
      return this.message1 = "ID already exists"
    }
    this.message1 = '';
  }

  key(event) {
    if (event.which == 32 && event.target.value.length == 0) {
      event.preventDefault();
    }
  }

  addNewItem() {
    if (this.listerror.trim().length > 1) {
      return this.toastr.warning('Please resolve the error to save.');
    }
    if (this.binding.length == 0) {
      return this.toastr.warning('List name cannot be empty');
    }
    else if (this.binding.length) {
      let newItem: AddItem = {
        ref_value: this.binding,
        ref_type: this.list.ref_type,
        children: []
      }

      this.data.push(newItem);
      let i = this.data.length - 1;
      this.getData(newItem, i);
      this.binding = '';
      this.newItem = !this.newItem;
      this.toggle = true;
      this.isSelected = true;
    }
  }

  /* to save list */
  save() {
    if (this.list) {
      this.list.children = [...this.removedItems, ...this.addedItems];
      this.masterService.updateMasterFunctional(this.list).subscribe((res: any) => {
        this.toastr.success(res.message);
        this.list = res.list;
      })
      this.toggle = false;
      this.edit = false;
      this.isSelected = false;
    }
  }

  /* to delete list */
  delete() {
    const dialogRef = this.dialogBox.open(DialogBoxComponent, {
      width: '400px',
      panelClass: 'dialog-box',
      data: {
        btnMsg: 'Yes',
        cancelMsg: 'No',
        message:
          'Do you want to delete'
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.data.splice(this.activeIndex, 1);
        let item: Remove = {
          ref_value: this.list.ref_value,
          ref_type: this.list.ref_type,
          del: true,
          _id: this.list._id,
          children: this.list.children
        }
        this.masterService.updateMasterFunctional(item).subscribe((res: any) => {
          this.toastr.success(res.message);
        })

        this.getData(this.data[0], 0);
      }
    });
  }

  /* navigate to hierarchy page to assign parent-child */
  assignParent() {
    this.masterService.getFunctionalHierarchy().subscribe((res: any) => {
      var assign = res.filter(e => e.ref_parent == this.list._id);
      if (assign.length) {
        this.route.navigate(['/home/mastertables/hierarchy-master/assign', assign[0]._id]);
      }
      else {
        this.route.navigate(['/home/mastertables/hierarchy-master/assign', this.list._id]);
      }
    });
  }
}
