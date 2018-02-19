import { Component, OnInit } from '@angular/core';
import { CourseTest, Test, Course, CourseTestApi, LoopBackAuth } from '../../../../../backend/index';
import { User } from '../../../../../backend/models/User';
import { UserApi } from '../../../../../backend/services/custom/User';

@Component({
  selector: 'tcm-course-exam-list',
  templateUrl: './course-exam-list.component.html',
  styleUrls: ['./course-exam-list.component.scss']
})
export class CourseExamListComponent implements OnInit {
  subscribe: boolean = true;
  public examDef: any = CourseTest.getModelDefinition();
  public examDetailsDef: Array<any> = [Test.getModelDefinition(),Course.getModelDefinition()];
  public examRows: any[] = [];
  constructor(private testApi: CourseTestApi,private userApi: UserApi,private loopbackApi: LoopBackAuth) { 
    userApi.getCourses(loopbackApi.getCurrentUserId()).takeWhile(() => this.subscribe).subscribe(courses=>{

      this.testApi.find({where: {courseId:{inq:courses.map(o=>o.id)}},order:"startDt DESC",include:[Course.name,Test.name]})
      .takeWhile(() => this.subscribe).subscribe(tests => {
        this.examRows = tests;
      });
    })
   
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscribe = false;
  }
}
