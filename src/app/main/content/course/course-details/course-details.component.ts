import { Component, OnInit } from '@angular/core';
import { CourseApi, Course, User, UserApi, Test, LoopBackAuth, CourseTest, CourseCandidate, CourseCandidateApi, Media, MediaLink, CourseTestApi, UserCourse, UserCourseTestApi, UserCourseTest } from '../../../../../backend/index';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTabChangeEvent, MatDialog } from '@angular/material';
import { AppListComponent } from '../../../app-list/app-list.component';
import { ExamComponent } from '../../exam/exam/exam.component';
import { forkJoin } from "rxjs/observable/forkJoin";
import { NbAuthService } from '../../../../core/auth/index';
import { transformMenu } from '@angular/material/menu/typings/menu-animations';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { DialogService } from '../../../../core/services/dialog.service';
import { error } from 'selenium-webdriver';
import { ExamsComponent } from '../../exam/exams/exams.component';
import { CourseExamComponent } from '../course-exam/course-exam.component';
import { ControlGeneratorService } from '../../../app-form/control-generator.service';
import { DynamicFormControlModel, DynamicTextAreaModel } from '@ng-dynamic-forms/core';
import { element } from 'protractor';
import { log } from 'util';
import { forEach } from '@angular/router/src/utils/collection';
import { userInfo } from 'os';
@Component({
  selector: 'tcm-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  subscribe: boolean = true;
  private sub: any;
  public candidateFields: DynamicFormControlModel[];
  public course: Course = new Course();
  public userDef: any = User.getModelDefinition();
  public userRows: any[] = [];
  public trainerRows: any[] = [];
  public candidateRows: any[] = [];
  public examDef: any = CourseTest.getModelDefinition();
  public candidateDef: any = CourseCandidate.getModelDefinition();
  public candidateObjectDef: any = CourseCandidate.getModelDefinition();
  public candidateRelDef: Array<any> = [User.getModelDefinition()];
  public examDetailsDef: Array<any> = [Test.getModelDefinition()];
  public examRows: any[] = [];
  public fileRows: any[] = [];
  private id: number;
  public isuserCourse: boolean = false;
  public iscourseCandidate: boolean = false;
  public isTrainerCourse: boolean = false;
  public candidateObject: CourseCandidate = new CourseCandidate();
  private
  constructor(private confirmService: DialogService, private cTestApi: CourseTestApi, private uCTestApi: UserCourseTestApi, private candidateApi: CourseCandidateApi, private formService: ControlGeneratorService, private loopbackApi: LoopBackAuth, public auth: NbAuthService, public dialog: MatDialog, private coursApi: CourseApi, private userApi: UserApi, private router: Router, private route: ActivatedRoute) {
    delete this.candidateObjectDef.properties.requestDt;
    delete this.candidateObjectDef.properties.cancelledDt;
    delete this.candidateObjectDef.properties.cancelledInfo;
    this.candidateFields = formService.getFormControlModel(this.candidateObjectDef);
    (this.candidateFields[0] as DynamicTextAreaModel).layout = { element: { control: "w-500" }, grid: { control: "w-500" } };
  }
  ngOnInit() {
    this.route.params.takeWhile(() => this.subscribe).subscribe(params => {
      this.id = +params['id'];
      this.coursApi.findById<Course>(this.id, { include: 'logoMedia' }).takeWhile(() => this.subscribe).subscribe(data => {
        this.course = data;
      })
      this.auth.isAuthenticated().takeWhile(() => this.subscribe).subscribe(auth => {
        if (auth) {
          this.coursApi.existsUsers(this.id, this.loopbackApi.getCurrentUserData().id)
            .subscribe(() => this.isuserCourse = true, error => { });
          this.coursApi.existsTrainers(this.id, this.loopbackApi.getCurrentUserData().id)
            .subscribe(() => this.isTrainerCourse = true, error => { });
          this.coursApi.getCandidates(this.id, { where: { userId: this.loopbackApi.getCurrentUserData().id, cancelledDt: null } })
            .subscribe((data) => {
              if (data.length > 0) {
                this.candidateObject = data[0];
              }

            }, error => { });
        }

      });

      this.loadUsersAndCandidates();

      this.coursApi.getCourseTests(this.id,{include:'test'}).takeWhile(() => this.subscribe).subscribe(tests => {
        this.examRows = tests;
      });

      this.coursApi.getTrainers(this.id).takeWhile(() => this.subscribe).subscribe(trainers => {
        this.trainerRows = trainers;
      });
      this.coursApi.getFiles(this.id).takeWhile(() => this.subscribe).subscribe(files => {
        this.fileRows = files;
      })

    });
  }
  ngOnDestroy() {
    this.subscribe = false;
  }
  loadUsersAndCandidates() {
    this.coursApi.getUsers(this.id).takeWhile(() => this.subscribe).subscribe(users => {
      this.userRows = users;
      this.coursApi.getCandidates(this.id, { where: { userId: { nin: users.map(u => u.id) } }, include: 'user' }).takeWhile(() => this.subscribe).subscribe(candidates => {
        this.candidateRows = candidates;
      })
    });
  }
  onUserActivate($event) {

  }
  addNewUser() {


    let dialogRef = this.dialog.open(AppListComponent, { width: '1000px', height: '90vh' });
    dialogRef.componentInstance.modelDef = User.getModelDefinition();


    dialogRef.componentInstance.allowAddNew = false;
    dialogRef.componentInstance.chooseMode = true;
    dialogRef.componentInstance.allowEditDelete = false;
    this.userApi.find<User>({ where: { id: { nin: this.userRows.map(u => u.id) } } }).subscribe(users => {

      dialogRef.componentInstance.data = users;
    });


    dialogRef.componentInstance.onChoose.subscribe(data => {
      data.forEach(element => {
        this.coursApi.linkUsers(this.id, element.id).subscribe(link => {
          this.coursApi.getCourseTests(this.id).subscribe(cTests => {
            cTests.forEach(cTest => {
              this.cTestApi.createUserCourseTests(cTest.id, { courseTestId: cTest.id, userId: element.id }).subscribe();
            });
          });
          this.userRows.push(element);
          this.userRows = [...this.userRows];
        });

      });
      dialogRef.close();

    })
  }
  onUserDelete(data) {
    let tasks$ = [];

    data.forEach(element => {
      tasks$.push(this.coursApi.unlinkUsers(this.id, element.id));

    });
    forkJoin(...tasks$).subscribe((results: any) => {
      this.coursApi.getUsers(this.id).subscribe(users => {
        this.userRows = [...users];
      });
      this.coursApi.getCourseTests(this.id).subscribe(cTests => {
        this.uCTestApi.find<UserCourseTest>({
          where: {
            and: [{ courseTestId: { inq: cTests.map(x => x.id) } },
            { userId: { inq: data.map(y => y.id) } },
            { completeDt: null }]
          }
        }).subscribe(uCTests => {
          uCTests.forEach(uCTest => {
            this.uCTestApi.deleteById(uCTest.id).subscribe();
          })
        });

      });
    }, error => console.log(error));
  }
  addNewTrainer() {


    let dialogRef = this.dialog.open(AppListComponent, { width: '1000px', height: '90vh' });
    dialogRef.componentInstance.modelDef = User.getModelDefinition();


    dialogRef.componentInstance.allowAddNew = false;
    dialogRef.componentInstance.chooseMode = true;
    dialogRef.componentInstance.allowEditDelete = false;
    this.userApi.find<User>({ where: { id: { nin: this.trainerRows.map(u => u.id) } } }).subscribe(users => {

      dialogRef.componentInstance.data = users.filter(user => user.roles.some(role => role.name == "trainer"));;
    });


    dialogRef.componentInstance.onChoose.subscribe(data => {
      data.forEach(element => {
        this.coursApi.linkTrainers(this.id, element.id).subscribe(link => {
          this.trainerRows.push(element);
          this.trainerRows = [...this.trainerRows];
        });

      });
      dialogRef.close();

    })
  }
  trainerDelete(data) {
    let tasks$ = [];

    data.forEach(element => {
      tasks$.push(this.coursApi.unlinkTrainers(this.id, element.id));

    });
    forkJoin(...tasks$).subscribe(results => {
      this.coursApi.getTrainers(this.id).subscribe(trainers => {
        this.trainerRows = [...trainers];
      });
    }, error => console.log(error));
  }
  onExamActivate(event) {
    if (event.type == "dblclick")
      this.router.navigate(["/exams/" + event.row.id + "/view"])

  }
  onExamEdit(data) {

    let examDialogRef = this.dialog.open(CourseExamComponent, { width: '95vw', height: '95vh' });
    examDialogRef.componentInstance.testId = data.testId;
    examDialogRef.componentInstance.courseId = this.id;
    examDialogRef.componentInstance.courseTest = data;
    examDialogRef.componentInstance.onSave.takeWhile(() => this.subscribe).subscribe(savedData => {
      // this.examRows.push(savedData);
      //this.examRows = [...this.examRows];
      examDialogRef.close();
    });


  }
  examEvaluate(data) {
    let examDialogRef = this.dialog.open(CourseExamComponent, { width: '95vw', height: '95vh' });
    examDialogRef.componentInstance.testId = data[0].testId;
    examDialogRef.componentInstance.courseId = this.id;
    examDialogRef.componentInstance.courseTest = data[0];
    examDialogRef.componentInstance.viewMode = true;

  }
  onExamDelete(data) {
    let confirm = this.confirmService.confirm("Czy jesteś pewien?", "Usunięcie testu spowoduje usunięcie wszystkich jego pytań oraz odpowiedzi użytkowników a nimi zwiazanych!")

    confirm.afterClosed().subscribe(result => {
      if (result) {
        let tasks$ = [];

        data.forEach(element => {
          tasks$.push(this.coursApi.destroyByIdCourseTests(this.id, element.id));

        });
        forkJoin(...tasks$).subscribe(results => {
          this.coursApi.getCourseTests(this.id).subscribe(tests => {
            this.examRows = tests;
          });
          
        });
      }
    });
  }
  addNewExam() {

    let dialogRef = this.dialog.open(ExamsComponent, { width: '1000px', height: '90vh' });
    //dialogRef.componentInstance.courseId = this.id;
    dialogRef.componentInstance.chooseMode = true;

    // dialogRef.componentInstance.id = 0;
    dialogRef.componentInstance.onChoose.subscribe(data => {

      let examDialogRef = this.dialog.open(CourseExamComponent, { width: '1000px', height: '90vh' });
      examDialogRef.componentInstance.testId = data[0].id;
      examDialogRef.componentInstance.courseId = this.id;
      examDialogRef.componentInstance.onSave.takeWhile(() => this.subscribe).subscribe(savedData => {
        this.coursApi.getUsers(this.id).subscribe(users=>{
          users.forEach(user => {
            this.cTestApi.createUserCourseTests(savedData.id, { courseTestId: savedData.id, userId: user.id }).subscribe();
          });
        });
        this.examRows.push(savedData);
        this.examRows = [...this.examRows];
        examDialogRef.close();
      });
      //this.examRows.push(data);
      //this.examRows=[...this.examRows];
      dialogRef.close();

    })
  }
  candidateSave(data: CourseCandidate) {
    data.courseId = this.id;
    data.userId = this.loopbackApi.getCurrentUserId();
    data.requestDt = new Date();
    this.candidateApi.create(data).subscribe((savedData) => {
      let confirm = this.confirmService.confirm("Powiadomienie", "Twoje zgłoszenie na wybrane szkolenie zostało zapisane. Materaiły szkoleniowe oraz testy będą dostępne po weryfikacji zgłoszenia, o której zostaniesz powiadomiony mailowo.", "OK", "")
      this.candidateObject = savedData;
    }, error => {
      let confirm = this.confirmService.confirm("Powiadomienie", "Twoje zgłoszenie NIE zostało zapisane w systemie, spróbuj ponownie, w razie powtórzenia tego komunikatu skontaktuj się z administratorem serwisu.", "OK", "");
    })
  }
  applicationCancel() {
    let confirm = this.confirmService.confirmWithValue("Podaj powód rezygnacji ze szkolenia", "Czy jesteś pewien?", "Czy jesteś pewien, że chcesz zrezygnować ze szkolenia!", "Usuń zgłoszenie", "Anuluj")

    confirm.afterClosed().subscribe((result) => {
      if (result) {
        this.candidateObject.cancelledDt = new Date();
        this.candidateObject.cancelledInfo = result.value;
        this.candidateApi.upsertPatch(this.candidateObject).subscribe(() => {
          let confirm = this.confirmService.confirm("Powiadomienie", "Twoje zgłoszenie na wybrane szkolenie zostało USUNIĘTE.", "OK", "")
          this.candidateObject = new CourseCandidate();
        }, error => {
          let confirm = this.confirmService.confirm("Powiadomienie", "Twoje zgłoszenie na wybrane szkolenie NIE zostało usunięte, spróbuj ponownie, w razie powtórzenia tego komunikatu skontaktuj się z administratorem serwisu.", "OK", "")
        })
      }
    });

  }
  addFiles() {


    let dialogRef = this.confirmService.openMediaPicker("Wybierz plik", "Dodaj do szkolenia", "Anuluj"
      , {
        selectLimit: 20
        ,
        acceptedFiles: null
      }, { width: "90vw" }
    );

    dialogRef.afterClosed().subscribe((data: any) => {
      let mediaLinks: MediaLink[] = [];
      if (data && data[0]) {
        data.forEach(element => {
          mediaLinks.push(new MediaLink({ mediaId: element.id, refId: this.id, refType: Course.name, createdAt: new Date(), updatedAt: new Date() }));
        });
        this.coursApi.createManyFiles(this.id, mediaLinks).subscribe(res => {
          this.coursApi.getFiles(this.id).takeWhile(() => this.subscribe).subscribe(files => {
            this.fileRows = files;
          })

        }, err => {
          let confirm = this.confirmService.confirm("Powiadomienie", "Pliki NIE zostały dodane, spróbuj ponownie, w razie powtórzenia tego komunikatu skontaktuj się z administratorem serwisu.", "OK", "")
        });

      }
    });


  }

  setCourseLogo() {

    let dialogRef = this.confirmService.openMediaPicker("Wybierz plik", "Ustaw jako logo szkolenia", "Anuluj", {
      selectLimit: 1,
      acceptedFiles: "image/jpeg,image/gif,image/png"
    }
    );
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data && data[0]) {
        // return array object of media
        //let logo = data[0];
        this.course.logoMedia = data[0];
        this.coursApi.upsert(this.course).subscribe(res => {
          //this.course.logoMedia = logo;

        }, err => {
          let confirm = this.confirmService.confirm("Powiadomienie", "Logo szkolenie NIE zostało dodane, spróbuj ponownie, w razie powtórzenia tego komunikatu skontaktuj się z administratorem serwisu.", "OK", "")
        });
      }
    });
  }
  deleteFile(data: MediaLink) {

    this.coursApi.destroyByIdFiles(this.id, data.id).subscribe(() => {
      this.fileRows = this.fileRows.filter(x => x.id != data.id);
    }, err => {
      let confirm = this.confirmService.confirm("Powiadomienie", "Załącznik NIE został usunięty, spróbuj ponownie, w razie powtórzenia tego komunikatu skontaktuj się z administratorem serwisu.", "OK", "")
    })
  }
  acceptCandidates(candidates: CourseCandidate[]) {
    let tasks$ = [];
    candidates.forEach(element => {
      tasks$.push(this.coursApi.linkUsers(this.id, element.userId));

    });
    forkJoin(...tasks$).subscribe(results => {
      this.loadUsersAndCandidates();
    }, err => {
      let confirm = this.confirmService.confirm("Powiadomienie", "Dodanie kandydatów do szkonie NIE powiodło się, spróbuj ponownie, w razie powtórzenia tego komunikatu skontaktuj się z administratorem serwisu.", "OK", "")
    });

    ;
  }
  // public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
  //   if (tabChangeEvent.index == 4 && this.userRows.length == 0) {
  //     this.coursApi.getUsers(this.id).subscribe(users => {
  //       this.userRows = users;
  //     });
  //   }
  //   else if (tabChangeEvent.index == 3 && this.examRows == []) {
  //     this.coursApi.getCourseTests(this.id).subscribe(tests => {
  //       this.examRows = tests;
  //     });
  //   } else if (tabChangeEvent.index == 5 && this.trainerRows == []) {
  //     this.coursApi.getTrainers(this.id).subscribe(trainers => {
  //       this.trainerRows = trainers;
  //     });
  //   }
  // }

}
