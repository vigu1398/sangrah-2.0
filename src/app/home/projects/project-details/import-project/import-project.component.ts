import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-import-project',
  templateUrl: './import-project.component.html',
  styleUrls: ['./import-project.component.scss']
})
export class ImportProjectComponent implements OnInit {
  @Output() closeModal = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ImportProjectComponent>
  ) { }

  ngOnInit() { }

  onCloseModal() {
    // this.closeModal.emit();
    this.dialogRef.close();
  }
  onDone() {
    this.closeModal.emit();
  }
}
