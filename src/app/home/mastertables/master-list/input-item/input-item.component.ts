import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewChecked,
  AfterViewInit,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-input-item',
  templateUrl: './input-item.component.html',
  styleUrls: ['./input-item.component.scss']
})
export class InputItemComponent implements AfterViewInit {
  @Input() value: string;

  @Output() deleteValue = new EventEmitter();
  valueItem;

  constructor() {}

  ngAfterViewInit() {
    this.valueItem = document.getElementById('id-' + this.value);
    if (this.valueItem) {
      this.valueItem.style.width = (this.valueItem.value.length + 2) * 8 + 'px';
      // this.valueItem.focus();
    }
  }

  public onDelete() {
    this.deleteValue.emit(this.value);
  }
}
