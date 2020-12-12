import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-allocation',
  templateUrl: './add-allocation.component.html',
  styleUrls: ['./add-allocation.component.scss']
})
export class AddAllocationComponent implements OnInit {
  @Output() closeModal = new EventEmitter();

  constructor() {}

  ngOnInit() {}
  onCloseModal() {
    this.closeModal.emit();
  }
  onAdd() {
    this.closeModal.emit();
  }
}
