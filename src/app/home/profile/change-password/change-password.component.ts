import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  @Output() closeModal = new EventEmitter();

  constructor() {}

  ngOnInit() {}
  onCloseModal() {
    this.closeModal.emit();
  }
  onDone() {
    this.closeModal.emit();
  }
}
