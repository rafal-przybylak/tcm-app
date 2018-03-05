import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

import { UserAnswerApi, Test, UserAnswer, LoopBackAuth, UserCourseTestApi, UserCourseTest } from '../../../../../backend/index';

import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/zip";
import { MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog.component';
import { User } from '../../../../../backend/models/User';
@Component({
  selector: 'tcm-course-exam-eval',
  templateUrl: './course-exam-eval.component.html',
  styleUrls: ['./course-exam-eval.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CourseExamEvalComponent implements OnInit {
  public answers: UserAnswer[];
  public coursId: number;
  editing = {};
  @Output() public onSave = new EventEmitter<boolean>();
  constructor(private dialog: MatDialog, private userCourseTestApi: UserCourseTestApi, private answerApi: UserAnswerApi, private auth: LoopBackAuth) {

  }

  ngOnInit() {
    console.log(this.auth.getCurrentUserData());
    this.userCourseTestApi.find<UserCourseTest>({where:{courseTestId:this.coursId}}).subscribe(userCourses=>{
      this.answerApi.find<UserAnswer>({
        include: { relation: 'question', scope: { where:{and:[ { isOpen: true },{courseScopeId:{inq:this.auth.getCurrentUserData().courseScopes.map(x=>x.id)}}] }} },
        where: { userCourseTestId: {inq:userCourses.map(x=>x.id)}} , order: "questionId ASC"
      }).subscribe(datas => {
        this.answers = datas.filter(ans => ans.question != null);
      },error=>console.log(error)
      )
    });
    
  }
  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false;
    this.answers[rowIndex][cell] = +event.target.value;
    this.answers = [...this.answers];
    console.log('UPDATED!', this.answers[rowIndex][cell]);
  }
  getRowHeight(row) {
    if (!row) return 50;
    let x=Math.max(row.value[0].length/50,row.question.content.length/50)*25;
   return Math.max(row.value[0].length/50,row.question.content.length/50)*25;
  
  }
  save() {
    let saves$: Array<Observable<UserAnswer>> = [];
    let userTests$: Array<Observable<UserCourseTest>> = [];
    this.answers.forEach(element => {
      element.trainerId = this.auth.getCurrentUserId();
      element.evaluationDt = new Date();
      saves$.push(this.answerApi.updateAttributes(element.id, element));
    });

    Observable.zip(...saves$).subscribe((answers: UserAnswer[]) => {
    
      //this.userCourseTestApi.evaluate(Array.from(new Set(answers.map(x => x.userCourseTestId)))).subscribe((tests) => {
        let dialRef = this.dialog.open(FuseConfirmDialogComponent);
        dialRef.componentInstance.confirmMessage = "Walidacja testu została zapiana."
        dialRef.componentInstance.onlyConfirm = true;
        dialRef.afterClosed().subscribe(()=>{
          this.onSave.next(true)
        })
       
        
    //   }, error => {
    //     let dialRef = this.dialog.open(FuseConfirmDialogComponent);
    //     dialRef.componentInstance.confirmMessage = "Walidacja testu została zapiana, jednak wyniki testu NIE zostały przeliczone. Proszę zapisać walidację powtórnie. W przypadku powtórzenia tego komunikatu skontaktuj się z administratorem serwisu."
    //     dialRef.componentInstance.onlyConfirm = true;
        
    // })
  }, error => {
      let dialRef = this.dialog.open(FuseConfirmDialogComponent);
      dialRef.componentInstance.confirmMessage = "Walidacja testu NIE została zapiana, w przypadku powtórzenia tego komunikatu skontaktuj się z administratorem serwisu."
      dialRef.componentInstance.onlyConfirm = true;
      
    });


  }
}
