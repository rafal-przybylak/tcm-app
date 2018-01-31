import { Component, OnInit } from '@angular/core';
import { CourseApi, Course, User, UserApi, Test, LoopBackAuth } from '../../../../../backend/index';
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
@Component({
  selector: 'tcm-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  private sub: any;
  public course: Course = new Course();
  public userDef: any = User.getModelDefinition();
  public userRows: any[];
  public userPopup: any[];
  public examDef: any = Test.getModelDefinition();
  public examRows: any[];
  private id: number;
  public isuserCourse: boolean = false;
  
  constructor(private confirmService: DialogService,private loopbackApi: LoopBackAuth, public auth: NbAuthService, public dialog: MatDialog, private coursApi: CourseApi, private userApi: UserApi, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.coursApi.findById<Course>(this.id).subscribe(data => {
        this.course = data;
      })
      this.auth.isAuthenticated().subscribe(auth => {
        if (auth)
          this.coursApi.existsUsers(this.id, this.loopbackApi.getCurrentUserData().id)
            .subscribe(() => this.isuserCourse = true);
      });
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  onUserActivate($event) {

  }
  addNewUser() {
    

    let dialogRef = this.dialog.open(AppListComponent, { width: '1000px', height: '90vh' });
    dialogRef.componentInstance.modelDef = User.getModelDefinition();


    dialogRef.componentInstance.allowAddNew = false;
    dialogRef.componentInstance.chooseMode = true;
    dialogRef.componentInstance.allowEditDelete = false;
    this.userApi.find<User>({where :{id:{nin:this.userRows.map(u=>u.id)}}}).subscribe(users => {
      this.userPopup = users;
      dialogRef.componentInstance.data=users;
    });


    dialogRef.componentInstance.onChoose.subscribe(data => {
      data.forEach(element => {
        this.coursApi.linkUsers(this.id, element.id).subscribe(link => {
          this.userRows.push(element);
          this.userRows=[...this.userRows];
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
    forkJoin(...tasks$).subscribe(results => {
      this.coursApi.getUsers(this.id).subscribe(users => {
        this.userRows = [...users];
      });
    },error=>console.log(error));
  }
  onExamActivate(event) {
    if (event.type == "dblclick")
      this.router.navigate(["/exams/" + event.row.id + "/view"])

  }
  onExamEdit(data) {

    this.router.navigate(["/exams/" + data.id])

  }
  onExamDelete(data) {
    let confirm = this.confirmService.confirm("Czy jesteś pewien?", "Usunięcie testu spowoduje usunięcie wszystkich jego pytań oraz odpowiedzi użytkowników a nimi zwiazanych!")

    confirm.afterClosed().subscribe(result => {
      if (result) {
        let tasks$ = [];

        data.forEach(element => {
          tasks$.push(this.coursApi.destroyByIdTests(this.id, element.id));

        });
        forkJoin(...tasks$).subscribe(results => {
          this.coursApi.getTests(this.id).subscribe(tests => {
            this.examRows = tests;
          });
        });
      }
    });
  }
  addNewExam() {

    let dialogRef = this.dialog.open(ExamComponent, { width: '1000px', height: '90vh' });
    dialogRef.componentInstance.courseId = this.id;
    dialogRef.componentInstance.popupMode = true;
    dialogRef.componentInstance.id = 0;
    dialogRef.componentInstance.onSave.subscribe(data => {
      this.examRows.push(data);
      this.examRows=[...this.examRows];
      dialogRef.close();

    })
  }
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.index == 4 && this.userRows == undefined) {
      this.coursApi.getUsers(this.id).subscribe(users => {
        this.userRows = users;
      });
    }
    else if (tabChangeEvent.index == 3 && this.examRows == undefined) {
      this.coursApi.getTests(this.id).subscribe(tests => {
        this.examRows = tests;
      });
    }
  }

}
