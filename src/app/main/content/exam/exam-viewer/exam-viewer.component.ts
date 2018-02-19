import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DynamicFormControlModel, DynamicFormService, DynamicFormValueControlModel, DynamicInputModel, DynamicCheckboxGroupModel, DynamicInputControlModel } from "@ng-dynamic-forms/core";
import { Test, UserAnswer, UserAnswerApi, LoopBackAuth, CourseTestApi, UserCourseTest, Course, TestQuestion } from '../../../../../backend/index';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ExamService } from '../exam.service';
import { ExamGeneratorService, ExamControlsAndValues } from '../../../services/exam-generator/exam-generator.service';
import { Data } from '@agm/core/services/google-maps-types';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/zip";
import { MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog.component';
import { FormGroup } from '@angular/forms';
import { CourseExamService } from '../course-exam.service';
import { DateFormatPipe } from '../../../../core/pipes/date-format.pipe';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'tcm-exam-viewer',
  templateUrl: './exam-viewer.component.html',
  styleUrls: ['./exam-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExamViewerComponent implements OnInit {
  public objectModel: any = {};
  fieldsObservable: Observable<ExamControlsAndValues>=new Observable<ExamControlsAndValues>();
  public objectFields: DynamicFormControlModel[];
  public formGroup: FormGroup;
  public objectName: string;
  private currentUserTest: UserCourseTest;
  public isEUCourse: boolean=false;
  constructor(private translate: TranslateService,  private route: ActivatedRoute, private courseTestApi: CourseTestApi, private formService: DynamicFormService, private dialog: MatDialog, public auth: LoopBackAuth, private userAnswerApi: UserAnswerApi, private router: Router, public data: CourseExamService, public examService: ExamGeneratorService) {
    let dateFormater = new DateFormatPipe(this.translate);

    route.paramMap.subscribe(params => {
      if (params.get("preview") == "true") {
        let testId = +params.get("id");
        this.objectName = "Podgłąd testu";
        this.fieldsObservable = examService.getControlsWithValueModel(data.object, auth.getCurrentUserId(), testId);
        this.fieldsObservable.subscribe(fields => {
          this.objectFields = fields.controls;
          this.formGroup = this.formService.createFormGroup(this.objectFields);
        })
      } else if (new Date(this.data.object.startDt) <= new Date(Date.now()) && new Date(this.data.object.endDt) >= new Date(Date.now())) {
        courseTestApi.getCourse(data.object.id).subscribe(course=>this.isEUCourse=course.fundingEU);
        this.objectName = data.object.name;
        this.fieldsObservable = examService.getControlsWithValueModel(data.object, auth.getCurrentUserId());
        this.fieldsObservable.subscribe(fields => {
          if (fields.userTests.length) {
            this.currentUserTest = fields.userTests[0];
          } else {
            this.courseTestApi.createUserCourseTests(data.object.id,
              new UserCourseTest({
                userId: this.auth.getCurrentUserId(),
                courseTestId: data.object.id,
  
              })).subscribe(userCourseTest => {
                this.currentUserTest = userCourseTest;
              });
          }
          this.objectFields = fields.controls;
          this.formGroup = this.formService.createFormGroup(this.objectFields);
        });

      } else {
        let info: string;
       
        if (new Date(this.data.object.startDt) > new Date()) {
          info = "Test jest jeszcze niedostępny. Termin na wykonanie to: "
            + dateFormater.transform(this.data.object.startDt) + " - " + dateFormater.transform(this.data.object.endDt) + "."
        } else {
          info = "Test jest już niedostępny. Termin na wykonanie to: "
            + dateFormater.transform(this.data.object.startDt) + " - " + dateFormater.transform(this.data.object.endDt) + "."
        }
        let dialRef = this.dialog.open(FuseConfirmDialogComponent);
        dialRef.componentInstance.confirmMessage = info;
        dialRef.componentInstance.onlyConfirm = true;
        dialRef.afterClosed().subscribe(()=>{
          router.navigate(["/courses/"+data.object.courseId]);
        })
      }


      

    })
  }
  ngOnInit() {




  }
  save() {
    let data = this.formGroup.value;
    //this.objectModel;
    let answers: UserAnswer[] = new Array<UserAnswer>();
    let saves$: Array<Observable<UserAnswer>> = [];
    try {

      Object.keys(data).forEach(prop => {
        let id: number = parseInt(prop.split("$$")[prop.split("$$").length - 1]);
        let value: any;


        switch (typeof data[prop]) {
          case "object": {
            if (Array.isArray(data[prop])) {
              value = data[prop];
            } else {
              value = new Array<any>();
              if (Object.keys(data[prop]).length > 0) {
                Object.keys(data[prop]).forEach(property => {
                  if (data[prop][property]) {
                    value.push(property);
                  }
                });
              } else {
                value.push(data[prop]);
              }

            }
            break;
          }
          default: {
            value = [data[prop]];
            break;
          }

        }
        let question:TestQuestion =this.data.object.test.testQuestions.filter(x=>x.id==id)[0];
        saves$.push(this.userAnswerApi.upsertWithWhere({ userCourseTestId: this.currentUserTest.id, questionId: id },
          
          new UserAnswer({
            userCourseTestId: this.currentUserTest.id,
            questionId: id,
            value: value,
            questContent: question.content,
            answerDt: new Date(Date.now()),
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now())
          })
        ));

      });

      Observable.zip(...saves$).subscribe((answers: UserAnswer[]) => {
        this.currentUserTest.completeDt=new Date();
        this.courseTestApi.updateByIdUserCourseTests(this.data.object.id, this.currentUserTest.id, this.currentUserTest).subscribe(data => {
          let dialRef = this.dialog.open(FuseConfirmDialogComponent);
          dialRef.componentInstance.confirmMessage = "Test został zapiany. Po sprawdzeniu pytań otwartych, informacje o wyniku zostaną wysłane na podany adres e-mail."
          dialRef.componentInstance.onlyConfirm = true;
          dialRef.afterClosed().subscribe(() => {
            this.router.navigate(["/courses/"+this.data.object.courseId]);
          });
        }, error => {
          let dialRef = this.dialog.open(FuseConfirmDialogComponent);
          dialRef.componentInstance.confirmMessage = "Test NIE został zapiany, w przypadku powtórzenia tego komunikatu skontaktuj się z administratorem serwisu."
          dialRef.componentInstance.onlyConfirm = true;

        });


      }, error => {
        let dialRef = this.dialog.open(FuseConfirmDialogComponent);
        dialRef.componentInstance.confirmMessage = "Test NIE został zapiany, w przypadku powtórzenia tego komunikatu skontaktuj się z administratorem serwisu."
        dialRef.componentInstance.onlyConfirm = true;

      });


    } catch (error) {
      let dialRef = this.dialog.open(FuseConfirmDialogComponent);
      dialRef.componentInstance.confirmMessage = "Test NIE został zapiany, wprowadż wszystkie odpowiedzi do testu."
      dialRef.componentInstance.onlyConfirm = true;

    }
  }
  addToArray(array: Array<string>, value: string): Array<string> {
    if (array.indexOf(value) > -1) return array;
    else {
      array.push(value);
      return array;
    }
  }
  removeFromArray(array: Array<string>, value: string): Array<string> {
    if (array.indexOf(value) > -1) return array.filter(e => e !== value);
    else return array;
  }


}