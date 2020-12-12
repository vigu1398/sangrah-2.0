import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.scss']
})
export class ImportDataComponent implements OnInit {

  @Output() closeModal = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ImportDataComponent>) 
  {
    
  }

  ngOnInit() { }

  onCloseModal() {
    // this.closeModal.emit();
    this.dialogRef.close();
  }
  onDone() {
    this.closeModal.emit();
  }

}
