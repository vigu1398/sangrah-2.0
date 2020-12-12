import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ChildComponent>
  ) { }

  list: any[] = [];
  record: any;
  searchItem: string;

  ngOnInit() {
    this.record = this.data.selectedList;
    this.list = this.record.filter(function (item) { return item.isChecked == true });
  }

  get filter() {
    let data = this.record;
    if (this.searchItem) {
      data = data.filter(item => {
        return item.ref_value.toLowerCase().indexOf(this.searchItem.toLowerCase()) >= 0
      })
    }
    return data;
  }

  selectItem(list, event) {
    if (event.target.checked) {
      this.list.push(list);
      let id = list._id;
      let index = this.data.child.indexOf(id);
      this.data.child.splice(index, 1);
    }
    else {
      for (var i = 0; i < this.record.length; i++) {
        if (this.list[i] == list) {
          this.list.splice(i, 1);
          let id = list._id;
          this.data.child.push(id);
        }
      }
    }
    this.data.selectedList = this.list;
  }

  done() {
    this.data.selectedList = this.list;
  }

  close() {
    this.dialogRef.close();
  }
}
