import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CourseTestApi, CourseTest, UserCourse, UserCourseTest, UserCourseTestApi, LoopBackAuth } from '../../../../../backend/index';

import { ControlGeneratorService } from '../../../app-form/control-generator.service';
import { User } from '../../../../../backend/models/User';
import { MatDialog } from '@angular/material';
import { CourseExamEvalComponent } from '../course-exam-eval/course-exam-eval.component';
import { FuseConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog.component';
import { AppAuthModule } from '../../../../core/auth/app-auth.module';
import { NbAuthService } from '../../../../core/auth';

@Component({
  selector: 'tcm-course-exam',
  templateUrl: './course-exam.component.html',
  styleUrls: ['./course-exam.component.scss']
})
export class CourseExamComponent implements OnInit {
  private modelDefinition: any = CourseTest.getModelDefinition();
  public objectFields: any;
  public courseTest: CourseTest = new CourseTest();
  public userCourseExamRows: UserCourseTest[] = [];
  public userCourseExamDef: any = UserCourseTest.getModelDefinition();
  public testId: number;
  public courseId: number;
  private subscribe: boolean = true;
  public objectName: string = this.modelDefinition.title.split("|")[0];
  public examUserDef: Array<any> = [User.getModelDefinition()];
  public viewMode: boolean = false;
  public isAdmin:boolean= false;
  @Output() public onSave = new EventEmitter<any>();
  constructor(public auth:NbAuthService, private courseTestApi: CourseTestApi, public dialog: MatDialog, private userCourseTestApi: UserCourseTestApi, private formService: ControlGeneratorService) {
    delete this.modelDefinition.properties.courseId;
    delete this.modelDefinition.properties.testId;
    this.objectFields = formService.getFormControlModel(this.modelDefinition);
  }

  ngOnInit() {
    this.getUserTestData();


  }
  public ngOnDestroy() {
    this.subscribe = false;
  }
  save(data: CourseTest) {
    data.testId = this.testId;
    data.courseId = this.courseId;
    if (data.id > 0) {

      this.courseTestApi.updateAttributes(data.id, data).takeWhile(() => this.subscribe).subscribe(sData => {

        this.onSave.next(sData);

      });
    } else {
      this.courseTestApi.create(data).takeWhile(() => this.subscribe).subscribe(sData => {

        this.onSave.next(sData);

      });
    }
  }
  avaluate() {
    let examDialogRef = this.dialog.open(CourseExamEvalComponent, { width: '95vw', height: '95vh' });
    examDialogRef.componentInstance.coursId = this.courseTest.id;
    examDialogRef.componentInstance.onSave.subscribe(data => {
      this.getUserTestData();
      examDialogRef.close();
    });

  }
  getUserTestData() {
    if(this.courseTest.id){
      this.userCourseTestApi.find<UserCourseTest>({ include: ["user"], where: { courseTestId: this.courseTest.id } }).subscribe(exams => {
        this.userCourseExamRows = exams;
      });
    }else{
      this.userCourseExamRows = [];
    }
    
  }
  avaluateUsers() {
    this.userCourseTestApi.find<UserCourseTest>({ where: { courseTestId: this.courseTest.id } }).subscribe(userCourses => {
      this.userCourseTestApi.evaluate(userCourses.map(x=>x.id)).subscribe((tests) => {
        let dialRef = this.dialog.open(FuseConfirmDialogComponent);
        dialRef.componentInstance.confirmMessage = "Walidacja testu została zapiana."
        dialRef.componentInstance.onlyConfirm = true;
        


      }, error => {
        let dialRef = this.dialog.open(FuseConfirmDialogComponent);
        dialRef.componentInstance.confirmMessage = "Walidacja testu NIE została zapiana. Proszę wykonać walidację powtórnie. W przypadku powtórzenia tego komunikatu skontaktuj się z administratorem serwisu."
        dialRef.componentInstance.onlyConfirm = true;

      })
    });
  }
  deleteUserExam(exams:UserCourseTest[]){
    exams.forEach(exam => {
      this.userCourseTestApi.deleteById(exam.id).subscribe(()=>{
        this.userCourseExamRows=this.userCourseExamRows.filter(x=>x.id!=exam.id);
      })
    });
  }
  sendAllUserExamInfo(){
    this.userCourseTestApi.find<UserCourseTest>({ where: { courseTestId: this.courseTest.id,completeDt:null } }).subscribe(userCourses => {
      this.sendUserExamInfo(userCourses);
    });
  }
  sendExamReminder(){
   
      this.userCourseTestApi.sendExamReminder(this.courseTest.id).subscribe((sentInfo)=>{
        let errorEmails=[];
         sentInfo.forEach(element => {
           if(element.sentError){
             errorEmails.push(element.sentData.to);
           }
         });
         let dialRef = this.dialog.open(FuseConfirmDialogComponent);
         if(errorEmails.length>0){
           dialRef.componentInstance.confirmMessage = "Monity NIE zostały wysłane do następujących uczestników, proszę wysłać wiadomości powtórnie: "+ errorEmails.join(", ");
         }else{
           dialRef.componentInstance.confirmMessage = "Monity zostały wysłane do wszytkich uczestników, którzy nie podeszli do egzaminu ";
         }
        
         dialRef.componentInstance.onlyConfirm = true;
         }, error => {
           let dialRef = this.dialog.open(FuseConfirmDialogComponent);
           dialRef.componentInstance.confirmMessage = "Informacje o walidacji egzaminu NIE zostały wysłane. Proszę spróbować ponownie. W przypadku powtórzenia tego komunikatu skontaktuj się z administratorem serwisu."
           dialRef.componentInstance.onlyConfirm = true;
   
         });
   
  }
  sendUserExamInfo(exams:UserCourseTest[]){
    this.userCourseTestApi.sendEvaluateMessage(exams.map(x=>x.id)).subscribe((sentInfo)=>{
     let errorEmails=[];
      sentInfo.forEach(element => {
        if(element.sentError){
          errorEmails.push(element.sentData.to);
        }
      });
      let dialRef = this.dialog.open(FuseConfirmDialogComponent);
      if(errorEmails.length>0){
        dialRef.componentInstance.confirmMessage = "Informacje o walidacji egzaminu NIE zostały wysłane do następujących uczestników, proszę wysłać wiadomości powtórnie: "+ errorEmails.join(", ");
      }else{
        dialRef.componentInstance.confirmMessage = "Informacje o walidacji egzaminu zostały wysłane do wybranych uczestników";
      }
     
      dialRef.componentInstance.onlyConfirm = true;
      }, error => {
        let dialRef = this.dialog.open(FuseConfirmDialogComponent);
        dialRef.componentInstance.confirmMessage = "Informacje o walidacji egzaminu NIE zostały wysłane. Proszę spróbować ponownie. W przypadku powtórzenia tego komunikatu skontaktuj się z administratorem serwisu."
        dialRef.componentInstance.onlyConfirm = true;

      });
  
  }
}
