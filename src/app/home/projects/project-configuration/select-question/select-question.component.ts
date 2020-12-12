import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProjectsService } from 'src/app/services/projects.service';
import _ from 'underscore';

@Component({
    selector: 'app-select-question',
    templateUrl: './select-question.component.html',
    styleUrls: ['./select-question.component.scss']
})
export class SelectQuestionComponent implements OnInit {
    @Output() closeModal = new EventEmitter();
    public selectedItem;
    public activeIndex: number;
    list: any[];
    default: any;
    fieldName: string = '';
    itemset: string = '';
    id: number;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private projectService: ProjectsService,
        public dialogRef: MatDialogRef<SelectQuestionComponent>
    ) { }

    ngOnInit() {
        this.default = this.data.default;
        this.list = this.data.list.slice(0,_.findIndex(this.data.list,{name: this.default.name}));
    }

    assign(item, i) {
        this.fieldName = item.name;
        this.id = item.name;
        this.itemset = (item.datakey)?item.datakey.name:item.itemset;
        this.activeIndex = i;
    }

    done() {
        if (this.fieldName) {
            this.data.list = this.fieldName;
            this.data.id = this.id;
            this.data.itemset = this.itemset;
        }
        else {
            this.data.list = "select"
        }
    }

    close() {
        this.dialogRef.close();
    }

}
