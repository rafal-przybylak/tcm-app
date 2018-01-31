import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DynamicFormControlModel, DynamicFormService, DynamicFormValueControlModel, DynamicInputModel, DynamicCheckboxGroupModel, DynamicInputControlModel } from "@ng-dynamic-forms/core";
import { Test, UserAnswer, UserAnswerApi, LoopBackAuth } from '../../../../../backend/index';
import { Router } from '@angular/router';
import { ExamService } from '../exam.service';
import { ExamGeneratorService, ExamControlsAndValues } from '../../../services/exam-generator/exam-generator.service';
import { Data } from '@agm/core/services/google-maps-types';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/zip";
import { MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog.component';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'tcm-exam-viewer',
  templateUrl: './exam-viewer.component.html',
  styleUrls: ['./exam-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExamViewerComponent implements OnInit {
  public objectModel: any = {};
  fieldsObservable: Observable<ExamControlsAndValues>;
  public objectFields: DynamicFormControlModel[];
  public formGroup: FormGroup;
  public objectName: string;
  constructor(private formService: DynamicFormService, private dialog: MatDialog, public auth: LoopBackAuth, private userAnswerApi: UserAnswerApi, private router: Router, public data: ExamService, public examService: ExamGeneratorService) {
    this.objectName = data.object.name;

    this.fieldsObservable = examService.getControlsWithValueModel(data.object.id, auth.getCurrentUserId());
    this.fieldsObservable.subscribe(data => {
      this.objectFields = data.controls;

      this.formGroup = this.formService.createFormGroup(this.objectFields);
    })
  }
  ngOnInit() {




  }
  save() {
    let data = this.formGroup.value;
    //this.objectModel;
    let answers: UserAnswer[] = new Array<UserAnswer>();
    let saves$: Array<Observable<UserAnswer>> = [];
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
      saves$.push(this.userAnswerApi.upsertWithWhere({ userId: parseInt(this.auth.getCurrentUserId()), questionId: id },
        new UserAnswer({
          userId: parseInt(this.auth.getCurrentUserId()),
          questionId: id, value: value, createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now())
        })
      ));

    });
  //   if(quest!==undefined){
  //     this.userApi.updateByIdUserAnswers(parseInt(this.auth.getCurrentUserId()),quest.id,new UserAnswer({
  //       userId: parseInt(this.auth.getCurrentUserId()),
  //       questionId: id, value: value, createdAt: new Date(Date.now()),
  //       updatedAt: new Date(Date.now())
  //     }));

  //   }elase{
  //     this.userApi.createUserAnswers(parseInt(this.auth.getCurrentUserId()),new UserAnswer({
  //       userId: parseInt(this.auth.getCurrentUserId()),
  //       questionId: id, value: value, createdAt: new Date(Date.now()),
  //       updatedAt: new Date(Date.now())
  //     }));
  //   }

  // }));
    Observable.zip(...saves$).subscribe((answers: UserAnswer[]) => {
      let dialRef = this.dialog.open(FuseConfirmDialogComponent);
      dialRef.componentInstance.confirmMessage = "Test został zapiany, informacje o wyniku zostaną wysłane na podany adres e-mail."
      dialRef.componentInstance.onlyConfirm = true;
      dialRef.afterClosed().subscribe(() => {
        this.router.navigate(["/user-course"]);
      });

    }, error => {
      let dialRef = this.dialog.open(FuseConfirmDialogComponent);
      dialRef.componentInstance.confirmMessage = "Test NIE został zapiany, w przypadku powtórzenia tego komunikatu skontaktuj się z administratorem serwisu."
      dialRef.componentInstance.onlyConfirm = true;
      dialRef.afterClosed().subscribe();
    });
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
