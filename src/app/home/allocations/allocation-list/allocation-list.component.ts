import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allocation-list',
  templateUrl: './allocation-list.component.html',
  styleUrls: ['./allocation-list.component.scss']
})
export class AllocationListComponent implements OnInit {
  constructor(private router: Router) {}
  public showAddModal = false;
  public DeployedProjects = [
    {
      id: 1,
      name: 'Meghalaya Health',
      shared_by: 'Shiva Rajan',
      allocated_to: 'Amit V',
      modified_on: '02/09/2018'
    },
    {
      id: 2,
      name: 'Meghalaya Health',
      shared_by: 'Shiva Rajan',
      allocated_to: 'Akash V',
      modified_on: '02/10/2018'
    }
  ];

  ngOnInit() {}
  showProjectsDetails(id: number) {
    this.router.navigate(['/home/allocations/allocation-config/' + id]);
  }
  addAlloction() {
    this.showAddModal = !this.showAddModal;
  }
}
