// import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { GridComponent, GridModel, ToolbarItems, DetailRowService, SelectionSettingsModel, PdfExportProperties } from '@syncfusion/ej2-angular-grids';
// import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
// import { ReorderService } from '@syncfusion/ej2-angular-grids';

// @Component({
//   selector: 'app-users-list',
//   templateUrl: './users-list.component.html',
//   styleUrls: ['./users-list.component.scss'],
//   // providers: [DetailRowService, ReorderService],
//   encapsulation: ViewEncapsulation.None
// })
// export class UsersListComponent implements OnInit {
//   constructor(private router: Router,
//     private http: HttpClient) { }
//   public showImportUser = false;
//   @ViewChild('grid', { static: true }) public grid: GridComponent;
//   public childGrid: GridModel;
//   public syndata: any[] = [];
//   public toolbarOptions: ToolbarItems[];
//   public selectionSettings: SelectionSettingsModel;
//   childData: any[] = [];
//   first: string = '';

//   public UserDetails = [
//     {
//       id: 1,
//       name: 'Akash V',
//       username: 'akashv',
//       email: 'akashv@gmail.com',
//       mobile: '123456789',
//       status: 'active',
//       creation_date: '02-03-2018',
//       inactive_since: '-'
//     },
//     {
//       id: 2,
//       name: 'amit V',
//       username: 'amitv',
//       email: 'amitv@gmail.com',
//       mobile: '123456789',
//       status: 'inactive',
//       creation_date: '02-04-2018',
//       inactive_since: '03-07-2018'
//     }
//   ];

//   ngOnInit() {
//     this.toolbarOptions = ['Search', 'ExcelExport', 'PdfExport', 'CsvExport'];
//     this.http
//       .get(
//         '/api/formdata/5f01b0d6f113a829c7eb3cd9'
//       )
//       .subscribe((res: any) => {
//         this.syndata = res;
//         this.first = Object.keys(res[0])[0];
//         console.log("UsersListComponent -> ngOnInit -> this.syndata", this.syndata);

//         for (var key in res) {
//           if (typeof res[key] != 'object' || res[key] == null) {
//             this.syndata.push(key);
//           }
//         }
//         // this.syndata.unshift("_id");
//         console.log(this.syndata);


//         // for (let i = 0; i < res.length; i++) {
//         //   if (this.syndata[i].attachments.length == 0) {
//         //     this.childData.push([]);
//         //   }
//         //   else {
//         //     this.childData.push(this.syndata[i].attachments);
//         //   }
//         // }

//         // this.selectionSettings = { type: 'Multiple', enableSimpleMultiRowSelection: true };
//         // this.childGrid = {
//         //   allowPaging: true,
//         //   queryString: this.first,
//         //   dataSource: this.syndata,
//         //   columns: [
//         //     { field: 'createdAt', headerText: 'createdAt' },
//         //     { field: 'createdBy', headerText: 'createdBy' },
//         //     { field: 'formId', headerText: 'formId' },
//         //     // { field: 'modifiedAt', headerText: 'modifiedAt' }
//         //   ]
//         // };
//       })
//   }

//   toolbarClick(args: ClickEventArgs): void {
//     if (args.item.text === 'Excel Export') {
//       this.grid.excelExport({ hierarchyExportMode: 'All' });
//     }

//     if (args.item.text === 'PDF Export') {
//       const exportProperties: PdfExportProperties = {
//         hierarchyExportMode: 'All'
//       };
//       this.grid.pdfExport(exportProperties);
//     }

//     if (args.item.text === 'CSV Export') {
//       this.grid.csvExport();
//     }
//   }


//   showUserDetails(id: number) {
//     this.router.navigate(['/home/user-management/users-details/' + id]);
//   }
//   importUser() {
//     this.showImportUser = !this.showImportUser;
//   }
// }




import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
// import { ApiCallsService } from '../api-calls.service';
import { HttpClient } from '@angular/common/http';
import { FilterService, GridComponent, PdfExportProperties, ExcelExportService, PdfExportService } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations'
import { ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
// import { ChildrenModel } from '../../models/children.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [FilterService, ExcelExportService, PdfExportService],
  encapsulation: ViewEncapsulation.None
})
export class UsersListComponent implements OnInit {
  public toolbar: string[];
  @ViewChild('grid', { static: true }) public grid: GridComponent;

  objectKey: string;
  width: number = 200;
  childColumnSource = [];
  columnSource = [];
  numberOfRecords: number;
  childSource: any = [];
  flag1: boolean = false;
  flag2: boolean = false;
  flag3: boolean;
  displayDataset: any;
  lines: string;
  ddlfields: { text: string; value: string; };
  d1data: { id: string; type: string; }[];
  pos: number;
  dataset: Object;
  allDataset: any;
  allKeys = [];
  childrenGridsArray: any[] = [];
  childrenGrid: any;
  numberOfChildren: number;
  constructor(private httpClient: HttpClient) {

  }

  addChild(tempCols: any) {
    this.childColumnSource = tempCols;
    this.childColumnSource.unshift("_id");

    this.childrenGrid =
    {
      queryString: "_id",
      dataSource: this.displayDataset,
      columns: this.childColumnSource
    }

    this.childrenGridsArray.push(this.childrenGrid);
    console.log("UsersListComponent -> addChild -> this.childrenGridsArray", this.childrenGridsArray)
    this.numberOfChildren++;
  }


  LoadChildren2(dataset: any): void {
    var tempCols = [];
    var tempKeys = [];
    for (var key in dataset) {
      if (typeof dataset[key] == 'object' && dataset[key] != null) {
        tempKeys = Object.keys(dataset[key]);
        for (var j = 0; j < tempKeys.length; j++) {
          if (isNaN(tempKeys[j])) {
            tempCols.push(tempKeys[j]);
          }
        }
      }
    }
    if (tempCols.length > 0) {
      this.addChild(tempCols)
    }
    for (var key in dataset) {
      if (typeof dataset[key] == 'object' && dataset[key] != null) {
        this.LoadChildren2(dataset[key]);
      }
    }
  }

  LoadChildren(response: any): void {
    var tempCols = [];
    var tempKeys = [];
    for (var key in response[0].source) {
      if (typeof response[0].source[key] == 'object' && response[0].source[key] != null) {
        tempKeys = Object.keys(response[0].source[key]);
        console.log("UsersListComponent -> LoadChildren -> tempKeys", tempKeys)
        for (var j = 0; j < tempKeys.length; j++) {
          tempCols.push(tempKeys[j]);
        }
      }
    }
    this.addChild(tempCols);
    for (var key in response[0].source) {
      if (typeof response[0].source[key] == 'object' && response[0].source[key] != null) {
        this.LoadChildren2(response[0].source[key]);
      }
    }
  }

  getPosts(): any {
    var i = 0;
    let obs = this.httpClient.get("/api/formdata/5f01b0d6f113a829c7eb3cd9");
    obs.subscribe((response) => {
      this.allDataset = response;
      this.preProcess(response);
      this.Load(response);
      this.LoadColumns(response);
      this.LoadChildren(response);
      //console.log(this.displayDataset);
      for (var i = 0; i < this.numberOfChildren; i++) {
        this.childrenGridsArray[i]["childGrid"] = this.childrenGridsArray[i + 1];
      }
    });

  }


  ngOnInit() {
    this.childrenGrid = { dataSource: this.displayDataset, queryString: " ", columns: " " };
    this.numberOfChildren = 0
    this.allKeys = [];
    this.pos = 0;
    this.childColumnSource = [{ field: "_id", headerText: "id", width: this.width }];
    this.columnSource = [];
    this.toolbar = ['Print', 'PdfExport', 'Search', 'ExcelExport'];
    this.lines = 'Vertical';
    this.ddlfields = { text: 'type', value: 'id' };
    this.d1data = [{ id: 'Horizontal', type: 'Horizontal' },
    { id: 'Vertical', type: 'Vertical' },
    { id: 'Both', type: 'Both' },
    { id: 'None', type: 'None' }];
    this.getPosts();
  }

  LoadColumns(response: any): void {
    for (var key in response[0].source) {
      if (typeof response[0].source[key] != 'object' || response[0].source[key] == null) {
        this.columnSource.push(key);
      }
    }
    this.columnSource.unshift("_id");
    for (var i = 0; i < this.columnSource.length; i++) {

      // this.s.push({
      //   field: this.columnSource[i],
      //   headerText: this.columnSource[i]
      // })
      // console.log("UsersListComponent -> addChild -> this.s", this.s)
    }

  }

  //Handles grid exports 
  toolbarClick(args: ClickEventArgs): void {
    if (args.item.text === 'Excel Export') {
      this.grid.excelExport({ hierarchyExportMode: 'All' });
    }

    if (args.item.text === 'PDF Export') {
      const exportProperties: PdfExportProperties = {
        hierarchyExportMode: 'All'
      };
      this.grid.pdfExport(exportProperties);
    }

    if (args.item.text === 'CSV Export') {
      this.grid.csvExport();
    }
  }

  //Handling grid lines change and reflection it back to the data grid
  change(e: ChangeEventArgs): void {
    let lines: any = <string>e.value;
    this.grid.gridLines = lines;
    this.grid.refresh();
  }

  expand(): void {
    this.grid.detailRowModule.expandAll();
  }

  collapse(): void {
    this.grid.detailRowModule.collapseAll();
  }

  keysExtractor(dataset: any): void {
    for (var key in dataset) {
      if (typeof dataset[key] != 'object') {
        this.allKeys.push(key);
      }
      else {
        this.keysExtractor(dataset[key]);
      }
    }
  }

  preProcess(response: any): void {
    this.displayDataset = [];
    this.numberOfRecords = response.length;

    // Extracting keys and subkeys from one record
    for (var key in response[0].source) {
      if (typeof response[0].source[key] != 'object') {
        this.allKeys.push(key);
      }
      else {
        this.keysExtractor(response[0].source[key]);
      }
    }

    for (var i = 0; i < this.numberOfRecords; i++) {
      let recordObject = {};
      for (var j = 0; j < this.allKeys.length; j++) {
        recordObject[this.allKeys[j]] = " ";
      }
      this.displayDataset.push(recordObject);
    }
  }

  DeepKeys(dataset: any, i: number) {
    for (var key in dataset) {
      if (typeof dataset[key] == 'object') {
        this.DeepKeys(dataset[key], i);
      }

      else if (!isNaN(dataset[key])) {
        this.displayDataset[i][key] = dataset[key];
      }
      else {
        this.displayDataset[i][key] = dataset[key];
      }
    }
  }

  Load(response): void {
    for (var i = 0; i < this.numberOfRecords; i++) {
      this.displayDataset[i]["_id"] = response[i]._id;
      for (var key in response[i].source) {
        if (typeof response[i].source[key] == 'object') {
          this.DeepKeys(response[i].source[key], i);
        }
        else {
          this.displayDataset[i][key] = response[i].source[key];
        }
      }
    }
  }
}
