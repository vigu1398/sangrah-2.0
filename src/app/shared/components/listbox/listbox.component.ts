import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-listbox',
  templateUrl: './listbox.component.html',
  styleUrls: ['./listbox.component.scss']
})
export class ListboxComponent implements OnInit, OnChanges {
  @Input() items;
  @Input() activeIndex;
  @Input('displayKey')
  set displayKey(value: boolean) {
    this.key = value;
    this.selectItem.emit(this.items[this.activeIndex]);
  }

  public key;
  @Output() selectItem = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    this.selectItem.emit(this.items[this.activeIndex]);
  }

  public onSelectItem(i: number, output: any) {
    this.activeIndex = i;
    this.selectItem.emit(output);
  }
}
