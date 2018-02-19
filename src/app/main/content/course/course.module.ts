import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFormModule } from '../../app-form/app-form.module';
import { RouterModule } from '@angular/router';
import { FuseWidgetModule } from '../../../core/components/widget/widget.module';
import { SharedModule } from '../../../core/modules/shared.module';
import { AgmCoreModule } from '@agm/core';
import { ControlGeneratorService } from '../../app-form/control-generator.service';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseListComponent } from './course-list/course-list.component';
import { AppListModule } from '../../app-list/app-list.module';
import { AppListComponent } from '../../app-list/app-list.component';
import { ExamComponent } from '../exam/exam/exam.component';
import { ExamModule } from '../exam/exam.module';
import { ExamsComponent } from '../exam/exams/exams.component';
import { CourseExamComponent } from './course-exam/course-exam.component';
import { CourseExamEvalComponent } from './course-exam-eval/course-exam-eval.component';
import { CourseExamListComponent } from './course-exam-list/course-exam-list.component';


const routes = [
  {
    path: '',
    component: CourseListComponent
  },
  {
    path: ':id',
    component: CourseDetailsComponent
  },
  {
    path: '**',
    component: CourseListComponent
  }

];
@NgModule({
  imports: [
    CommonModule,
    ExamModule,
    AppFormModule,
    RouterModule.forChild(routes),
    FuseWidgetModule,
    SharedModule,
    AppListModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB9fQ4_CECefuOOFoE2zi0aYVuCftSF5Js'
    })
  ],
  declarations: [CourseListComponent, CourseDetailsComponent, CourseExamComponent, CourseExamEvalComponent, CourseExamListComponent],
  exports: [CourseListComponent, CourseDetailsComponent],
  providers: [ControlGeneratorService],
  entryComponents: [AppListComponent, ExamComponent,ExamsComponent,CourseExamComponent,CourseExamEvalComponent]

})
export class CourseModule { }
