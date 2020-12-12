import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allocation-config',
  templateUrl: './allocation-config.component.html',
  styleUrls: ['./allocation-config.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AllocationConfigComponent implements OnInit {
  public showAddModal = false;
  public fieldNames = [
    {
      id: 1,
      label: 'Allocation1',
      values: ['Male', 'Female', 'Other']
    },
    {
      id: 2,
      label: 'Allocation2',
      values: ['Yes', 'No']
    },
    {
      id: 3,
      label: 'Allocation3',
      values: ['Yes', 'No']
    },
    {
      id: 4,
      label: 'Allocation4',
      values: ['Yes', 'No']
    },
    {
      id: 5,
      label: 'Allocation5',
      values: ['Yes', 'No']
    }
  ];

  public selectedItem;
  public activeIndex = 0;

  constructor(private router: Router) {}

  ngOnInit() {}
  addAllocation() {
    this.showAddModal = !this.showAddModal;
  }
  public onListItemSelected(selectedItem) {
    this.selectedItem = selectedItem;
  }
  public onAddValue() {
    this.selectedItem.values.push('');
  }
  public onAddField() {
    this.fieldNames.unshift({
      id: null,
      label: '',
      values: []
    });
    this.selectedItem = this.fieldNames[0];
  }

  goBack() {
    window.history.back();
    // this.router.navigate(['/home/allocations/allocation-list']);
  }
}
