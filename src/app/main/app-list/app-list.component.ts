import { Component, OnInit, ViewChild, TemplateRef, Pipe, PipeTransform, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { DateFormatPipe } from '../../core/pipes/date-format.pipe';
import { SDKModels } from '../../../backend/index';
import { MatInput } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss']
})
export class AppListComponent implements OnInit {

  public displayedColumns = []
  selected = [];
  selector = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('chkBxTmpl') chkBxTmpl: TemplateRef<any>;
  @ViewChild(MatInput) filter: MatInput;
  public dataSource: any[];
  public tempDataSource: any[];
  @Input() public modelDef: any;
  @Output() public onRowActivate = new EventEmitter<any>();
  @Output() public goToAddNew = new EventEmitter<boolean>();
  @Output() public onEdit = new EventEmitter<any>();
  @Output() public onDelete = new EventEmitter<any>();
  @Output() public onChoose = new EventEmitter<any>();
  @Input() public loadRelations: Array<any> = new Array<any>();
  @Input() public allowAddNew: boolean = true;
  @Input() public allowEditDelete: boolean = true;
  @Input() public chooseMode: boolean = false;
  @Input() public chooseCustom: string = '';
  @Input() public chooseCustomTooltiop: string = '';
  //@Input() public data: any[] ;// Observable<any[]> =new  Observable<any[]>() ;
  private _data = new BehaviorSubject<any[]>([]);
  //public data2: any[] ;
  // props = modelDef.properties;
  private subscribe: any;
  @Input()
  set data(value) {
    // set the latest value for _data BehaviorSubject
    if(Array.isArray(value)){
      this._data.next(value);
    }
    
  };

  get data() {
    // get the latest value from _data BehaviorSubject
    return this._data.getValue();
  }
  constructor(private router: Router, private translate: TranslateService, private sdkModels: SDKModels) {


  }
  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    // if(changes["data"]&& this.data)
    // {
    //   this._data.next(this.data);
    // }
    // if(changes["data2"]&& this.data2)
    // {
    //   this._data.next(this.data2);
    // }
  }
  ngOnInit() {

    this.subscribe = this._data.subscribe(data => {
      if (data) {
        this.dataSource = data;
        this.tempDataSource = [...data];
        this.filter.value = null;
        this.selected = [];
      }
    });

    this.loadColumnDef(this.modelDef,'');
    // this.displayedColumns.push({ checkboxable: true, headerCheckboxable: true })
    //this.tempDataSource = [...this.dataSource];
   
    this.loadRelations.forEach(element => {
      Object.keys(this.modelDef.relations).forEach(key => {
        if (this.modelDef.relations[key].relationType == "belongsTo" && this.modelDef.relations[key].type==element.name) {
          this.loadColumnDef(element,this.modelDef.relations[key].name+".");
          // this.displayedColumns.push({
          //   width: 300,
          //   prop: this.modelDef.relations[key].name + ".name",
          //   name: this.sdkModels.get(this.modelDef.relations[key].model).getModelDefinition().title
          // });
        }

      });
    });

  }
  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
  loadColumnDef(modelDef:any,masterModelPrefix:string){
    Object.keys(modelDef.properties).forEach(key => {
      if (modelDef.properties[key].title != "undefined" && modelDef.properties[key].title != "" && key.substr(key.length-2)!="Id") {

        if (modelDef.properties[key].type == "Date") {
          this.displayedColumns.push({ prop: masterModelPrefix+key, width: 150, name:(masterModelPrefix? modelDef.title.split("|")[0]+" - ":"")+ modelDef.properties[key].title, pipe: new DateFormatPipe(this.translate) });//'lll', this.translate.currentLang) });
        }
        else if (modelDef.properties[key].type == "boolean" || modelDef.properties[key].type == "number") {
          this.displayedColumns.push({ prop: masterModelPrefix+key, width: 100, name:(masterModelPrefix? modelDef.title.split("|")[0]+" - ":"")+ modelDef.properties[key].title});
        }
        else {
          this.displayedColumns.push({ prop: masterModelPrefix+key, width: 400, name:(masterModelPrefix? modelDef.title.split("|")[0]+" - ":"")+ modelDef.properties[key].title });
        }
      }
    });
  }
  applyFilter(value) {
    this.selected = [];
    const val = value.toLowerCase();
    let __this = this;
    // filter our data
    const tempDataSource = this.tempDataSource.filter(function (d) {
      let sourceStr: string;
      __this.displayedColumns.forEach(element => {
        sourceStr += d[element.prop] + " ";
      });
      return sourceStr.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.dataSource = tempDataSource;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onSelect({ selector }) {
    console.log('Select Event', selector, this.selected);

    //this.selected.splice(0, this.selected.length);
    //this.selected.push(...select);

  }

  onActivate(event) {

    this.onRowActivate.emit(event);
    //this.router.navigate(["/exams/"+ event.row.id])
    //console.log('Activate Event', event);
  }
  addNew() {
    this.goToAddNew.emit(true);
    //this.router.navigate(["/exams/0"]);


  }

  onSelectionChoose() {
    this.onChoose.next(this.selected);
  }
  edit() {
    this.onEdit.next(this.selected[0]);
  }
  delete() {
    this.onDelete.next(this.selected);
  }
}




