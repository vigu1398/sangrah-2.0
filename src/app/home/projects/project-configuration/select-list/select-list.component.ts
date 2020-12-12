import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
    selector: 'app-select-list',
    templateUrl: './select-list.component.html',
    styleUrls: ['./select-list.component.scss']
})
export class SelectListComponent implements OnInit {
    @Output() closeModal = new EventEmitter();
    public selectedItem;
    public activeIndex: number;
    list: any[];
    child: any;
    fieldName: string = '';
    id: number;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private projectService: ProjectsService,
        public dialogRef: MatDialogRef<SelectListComponent>
    ) { }

    ngOnInit() {
        this.projectService.getMasterList().subscribe((res: any) => {
            this.list = res;
            this.list.push({ref_value:'Default', children:this.data.default.map(({label, ...rest}) => ({ref_value: label, ...rest}))})
        })
    }

    assign(item, i) {
        this.fieldName = item.ref_value;
        this.id = item._id;
        this.child = item.children;
        this.activeIndex = i;
    }

    done() {
        if (this.fieldName) {
            this.data.list = this.fieldName;
            this.data.id = this.id;
        }
        else {
            this.data.list = "select"
        }
    }

    close() {
        this.dialogRef.close();
    }

}
