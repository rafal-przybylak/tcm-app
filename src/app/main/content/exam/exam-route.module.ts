import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RouterModule } from '@angular/router';


import { ExamComponent } from './exam/exam.component';
import { ExamsComponent } from './exams/exams.component';
import { ExamService } from './exam.service';
import { ExamViewerComponent } from './exam-viewer/exam-viewer.component';
import { ExamModule } from './exam.module';
import { AuthGuard } from '../../../auth-guard.service';
import { CoreConfig } from '../../../core/api.config';
const routes = [
  {
    path: '',
    component: ExamsComponent,
    resolve: {
      data: ExamService
    }
  }, {
    path: ':id',
    canActivate: [AuthGuard],
    data: {  expectedRole: CoreConfig.getAdminRoles()},
    component: ExamComponent,
    resolve: {
      data: ExamService
    }
  }, {
    path: ':id/view',
    component: ExamViewerComponent,
    resolve: {
      data: ExamService
    }
  }
];
@NgModule({
  imports: [
    ExamModule,
    RouterModule.forChild(routes)
  ]
  
})
export class ExamRouteModule { }
