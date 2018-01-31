import { Component, OnInit, ViewChild, TemplateRef, Pipe, PipeTransform } from '@angular/core';
import { Test, TestApi, TestQuestion, TestQuestionApi } from '../../../../../backend/index';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import 'moment-timezone';
import { ExamService } from '../exam.service';
import { NbAuthService } from '../../../../core/auth/index';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { DialogService } from '../../../../core/services/dialog.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Component({
  selector: 'tcm-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {
  public allowEdit: boolean = false;
  public rows = [];
  public modelDef: any;
  constructor(private testApi: TestApi, private questApi: TestQuestionApi, private confirmService: DialogService, private auth: NbAuthService, private router: Router, private data: ExamService, private translate: TranslateService) {
    this.modelDef = Test.getModelDefinition();
    this.data.onObjectsChanged.subscribe(data => {

    
      this.rows = data;
    });
    this.allowEdit = this.auth.isAdmin;
    this.auth.isAdmin$.subscribe(val => this.allowEdit = val);
  }

  ngOnInit() {

  }
  

  onActivate(event) {
    if (event.type == "dblclick")
      this.router.navigate(["/exams/" + event.row.id + "/view"])

  }
  addNew() {
    this.router.navigate(["/exams/0"]);
  }
  edit(row) {
    this.router.navigate(["/exams/" + row.id])
  }
  delete(data) {
    let confirm = this.confirmService.confirm("Czy jesteś pewien?", "Usunięcie testu spowoduje usunięcie wszystkich jego pytań oraz odpowiedzi użytkowników a nimi zwiazanych!")

    confirm.afterClosed().subscribe(result => {
      if (result) {
        let tasks$ = [];
        data.forEach(test => {
         
          tasks$.push(this.data.removeObject(test));
        });
        forkJoin(...tasks$).subscribe(results => {
          this.data.getObjects();
        });
      }
    })

  }
}




