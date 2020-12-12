import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 
{ 
  VirtualScrollService, 
  GridComponent, 
  GridLine,
  SortService,
  ToolbarService,
  FreezeService,
  ColumnChooserService,
  ResizeService,
  ReorderService,
  FilterService,
  DetailRowService,
  ExcelExportService,
  PdfExportService,
  EditService,
  QueryCellInfoEventArgs
} from '@syncfusion/ej2-angular-grids';
import { ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { ClickEventArgs } from '@syncfusion/ej2-navigations'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: 
  [
    VirtualScrollService, 
    FreezeService,
    SortService, 
    ToolbarService, 
    ColumnChooserService, 
    ResizeService, 
    ReorderService,
    FilterService,
    DetailRowService,
    ExcelExportService,
    PdfExportService,
    EditService
  ],
  encapsulation: ViewEncapsulation.None
})

export class UsersListComponent implements OnInit 
{

  @ViewChild('grid', {static: false}) public grid: GridComponent;

  entireScreen: boolean = false;
  displayFlag: boolean = false;
  requestBody: object = {};
  accessToken: string;
  
  dataSource: any = [];
  secondChildGrid: any;
  childrenGridsArray: any = [];
  childCount = new Array<number>();
  responseArray: any  = [];
  columnSource: string[] = [];
  
  toolbar: any = [];
  lines: string = "";
  ddlfields: { text: string; value: string; };
  d1data: { id: string; type: string; }[];
  
  secondChildColumnSource: any[][] = [];
  secondChildDataSource: any[] = [];
  formattedSecondChildColumnSource: any[] = [];
  
  firstGridDataSource: any = [];
  firstGridColumnSource: any[][] = [];
  firstChildGrid: any;
  
  pos: number;
  queryCount: number = 0;

  //For editing records
  public editSettings: Object;
  public orderidrules: Object;
  public customeridrules: Object;
  public freightrules: Object;
  public pageSettings: Object;
  public editparams: Object;

  
  constructor(private httpClient: HttpClient) 
  {

  }

  // Adding the column names into the columnSource
  prepareColumnSource(response, flag)
  {
    Object.keys(response).forEach((key) =>
    {
      if(typeof response[key] == 'object' && response[key] != null && !Array.isArray(response[key]))
      {
        this.prepareColumnSource(response[key], flag);
      }
      else if(!Array.isArray(response[key]))
      {
        if(flag == 1)
        {
          this.dataSource[this.pos][key] = response[key];
        }
        if(flag == 0 && key != '__v') 
        {
          this.columnSource.push(key);
        }
      }
    })
  }

  //Loading the dataSource with its keys and its corresponding values
  prepareDataSource()
  {
    for(var i = 0; i < this.responseArray.length; i++)
    {
      this.childCount[i] = 0;
      this.dataSource[i] = {};
      this.dataSource[i]["_id"] = this.responseArray[i]["_id"];
      this.pos = i;
      for(var key in this.responseArray[i])
      {
        if(typeof this.responseArray[i][key] == 'object' && this.responseArray[i][key] != null && !Array.isArray(this.responseArray[i][key]))
        { 
          this.prepareColumnSource(this.responseArray[i][key], 1);
        }
        else if(Array.isArray(this.responseArray[i][key]))
        {
          this.childCount[i]++;
          this.makeChild(this.responseArray[i][key], i, this.childCount[i], key);
        }
        else
        {
          this.dataSource[i][key] = "";
          this.dataSource[i][key] = this.responseArray[i][key];
        }
      }
    }
  }

  getColumnArrayProcessed(response, pos, childCount, parent)
  {
    var tempArray = [];
    var tempIndex: string = "";
    if(typeof response[0] == "object")
    {
      for(var i = 0; i < response.length; i++)
      {
        for(var key in response[i])
        {
          tempIndex = "Array" + "[" + i + "]" + key;
          tempArray.push(tempIndex);
          this.secondChildDataSource[pos]["_id"] = this.responseArray[pos]["_id"];
          this.secondChildDataSource[pos][tempIndex] = response[i][key];
        }
      }
    }
    else if(typeof response[0] == 'string')
    {
      for(var i = 0; i < response.length; i++)
      {
        tempIndex = i.toString();
        tempArray.push(tempIndex);
      }
    }
    //tempArray.unshift("_id");
    return tempArray;
  }


  makeChild(response, pos, childCount, key)
  {
    if(childCount == 1)
    {
      this.secondChildColumnSource[pos] = [];
    }
    this.secondChildColumnSource[pos][childCount - 1] = this.getColumnArrayProcessed(response, pos, childCount, key);
  }
  
  createFirstGridObject()
  {
    this.responseArray.forEach((response, i) => 
    {
      for(var key in response)
      {
        if(Array.isArray(response[key]))
        {
          this.secondChildDataSource[i] = {};
          this.firstGridDataSource.push({name: key, _id: response["_id"]});
        }
      }
    });
  }
    

  ngOnInit() 
  {
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true };
        this.freightrules =  { required: true };
        this.editparams = { params: { popupHeight: '300px' }};
    this.lines = 'Both';
    this.ddlfields = { text: 'type' , value: 'id'};
    this.d1data= [{ id: 'Horizontal', type: 'Horizontal' },
                  { id: 'Vertical', type: 'Vertical' },
                  { id: 'Both', type: 'Both' },
                  { id: 'None', type: 'None' }];
    this.toolbar = ["ColumnChooser", "Search", "Print", "PdfExport", "ExcelExport", "Add", "Edit", "Delete"]; 
    let obs = this.httpClient.get("/api/formdata/5f01b0d6f113a829c7eb3cd9");
    obs.subscribe((response) => 
    {
      this.responseArray = response;
      this.prepareColumnSource(response[0], 0);
      this.createFirstGridObject();
      this.prepareDataSource();
      this.formatSecondChildColumnSource();

      this.secondChildGrid = 
      {
        dataSource: this.secondChildDataSource,
        queryString: "_id",
        columns: this.formattedSecondChildColumnSource
      }
 
      this.firstChildGrid = 
      {
        dataSource: this.firstGridDataSource,
        queryString: "_id",
        columns: [{field: "name", headerText: "name", width: 150}],
        childGrid: this.secondChildGrid
      };
      this.displayFlag = true;
    });
  }

  change (e: ChangeEventArgs) : void 
  {
    let lines: any = <string>e.value;
    this.grid.gridLines = lines;
    this.grid.refresh();
  }


  formatSecondChildColumnSource()
  {
    var map = {};
    this.formattedSecondChildColumnSource = [];
    for(var i = 0; i < this.secondChildColumnSource.length; i++)
    {
      for(var j = 0; j < this.secondChildColumnSource[i].length; j++)
      {
        for(var k = 0; k < this.secondChildColumnSource[i][j].length; k++)
        {
          map[this.secondChildColumnSource[i][j][k]] = 1;
        }
      }
    }
    
    for(var key in map)
    {
      this.formattedSecondChildColumnSource.push({field: key, headerText: key, width: 150});
    }
    //this.formattedSecondChildColumnSource.push({field: "_id", headerText: "_id", width: 150});
  }

  toolbarClick(args: ClickEventArgs): void 
  {
    if (args.item.text === 'Excel Export') {
        this.grid.excelExport({hierarchyExportMode: 'All'});
    }
    if (args.item.text === 'PDF Export') {
        this.grid.pdfExport({hierarchyExportMode: 'All'});
    }
  }

  queryCellInfo(e)
  {
    if(this.queryCount < 200)
      this.queryCount++;
  }
}
