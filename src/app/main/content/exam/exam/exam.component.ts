import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TestQuestion, TestQuestionApi, Test, TestApi } from '../../../../../backend/index';
import { Router } from '@angular/router';
import { ControlGeneratorService } from '../../../app-form/control-generator.service';
import { DynamicFormControlModel, DynamicSelectModel } from '@ng-dynamic-forms/core';
import { ExamService } from '../exam.service';
import { MatDialog } from '@angular/material';
import { AppFormComponent } from '../../../app-form/app-form.component';
import { ExamConfig } from '../../../services/exam-generator/exam-config';
import { QuestionEditComponent } from '../question-edit/question-edit.component';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'tcm-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  public objectModel: any = new Test();// {"name":" ","desc":" ","startDt":new Date(),"endDt":new Date(),goelocLat:0,goelocLong:0,tags:" ",free:false};
  public sub: any;
  public objectFields: DynamicFormControlModel[];
  private modelDefinition: any = Test.getModelDefinition();
  public object: Test;
  public objectName: string = this.modelDefinition.title.split("|")[0];
  public questionDef: any = TestQuestion.getModelDefinition();
  public questionRows: any[];
  public isNew: boolean = true;
  @Input() public courseId: number;
  @Input() public popupMode: boolean = false;
  @Output() public onSave = new EventEmitter<any>();
  @Input() public id: number;
  constructor(public dialog: MatDialog, private router: Router, private data: ExamService, private testApi: TestApi, private testQuestApi: TestQuestionApi, private formService: ControlGeneratorService) {
    this.objectFields = formService.getFormControlModel(this.modelDefinition);

  }

  ngOnInit() {
    if (this.popupMode)
      this.data.popupResolve(this.id);
    this.objectModel = this.data.object;

    if (this.data.routeParams.id != 0) {
      this.testApi.getTestQuestions(this.data.routeParams.id).subscribe(data => {
        this.questionRows = data;
      });
      this.isNew = false;
    }

  }
  save(data: Test) {
    if (data.id > 0) {
      this.data.saveObject(data).then(sData => {
        if (!this.popupMode)
          this.router.navigate(["/exams"]);
        else
          this.onSave.next(sData);
      });
    }
    else {
      data.courseId = this.courseId;
      this.data.addObject(data).then(sData => {
        if (!this.popupMode)
          this.router.navigate(["/exams"]);
        else
          this.onSave.next(sData);
      });
    }

  }
  addNewQuest() {


    let dialogRef = this.dialog.open(QuestionEditComponent, { width: '1000px' });
    dialogRef.componentInstance.tesetId = this.data.routeParams.id;
    dialogRef.componentInstance.onSave.subscribe(data => {
      this.questionRows.push(data);
      this.questionRows=[...this.questionRows];
      //this.questionRows=[...this.questionRows]
      dialogRef.close();
    })

    // dialogRef.componentInstance.formFields = this.formService.getFormControlModel(TestQuestion.getModelDefinition());
    // dialogRef.componentInstance.formFields.push(new DynamicSelectModel({
    //   id: "ctlType",
    //   placeholder:"Typ pytania",
    //   required: true,  
    //   hint: "Określ rodzaj kontrolki dla pytania",
    //   options:ExamConfig.ControlOptions
    // }));
    // dialogRef.componentInstance.objectName = TestQuestion.getModelDefinition().title;
    // dialogRef.componentInstance.allowAddNew = false;
    // let newQuest = new TestQuestion();
    // newQuest.testId = this.data.routeParams.id;
    // dialogRef.componentInstance.formValue = newQuest;
    // dialogRef.componentInstance.onSave.subscribe(data => {
    //   this.testQuestApi.create(data).subscribe(resp => {
    //     this.questionRows.push(resp);
    //     dialogRef.close();
    //   })
    // })
    // dialogRef.afterClosed().subscribe((item: any) => {
    //   if (item) {
    //     this.questionRows.push(item);
    //   }
    // });

  }
  onQuestActivate(event) {


    //if (event.type == "dblclick") {
      let dialogRef = this.dialog.open(QuestionEditComponent, { width: '1000px' });
      dialogRef.componentInstance.tesetId = this.data.routeParams.id;
      dialogRef.componentInstance.objectModel = event;
      dialogRef.componentInstance.onSave.subscribe(data => {
        Object.assign(event,data);
        this.questionRows=[...this.questionRows];
        
        dialogRef.close();
      });
  }
  delete(data){
    let tasks$ = [];

    data.forEach(element => {
      tasks$.push(this.testQuestApi.deleteById(element.id));
  
    });
    forkJoin(...tasks$).subscribe(results => {
      this.testApi.getTestQuestions(this.data.routeParams.id).subscribe(data => {
        this.questionRows = data;
        this.questionRows=[...this.questionRows];
      })
    });
  }
}
