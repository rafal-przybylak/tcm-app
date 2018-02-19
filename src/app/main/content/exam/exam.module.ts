import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFormModule } from '../../app-form/app-form.module';
import { RouterModule } from '@angular/router';
//import { FuseWidgetModule } from '../../../core/components/widget/widget.module';
import { SharedModule } from '../../../core/modules/shared.module';

import { ControlGeneratorService } from '../../app-form/control-generator.service';
import { ExamComponent } from './exam/exam.component';
import { ExamsComponent } from './exams/exams.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ExamService } from './exam.service';
import { AppListModule } from '../../app-list/app-list.module';
import { AppFormComponent } from '../../app-form/app-form.component';
import { ExamViewerComponent } from './exam-viewer/exam-viewer.component';
import { ExamGeneratorService } from '../../services/exam-generator/exam-generator.service';
import { QuestionEditComponent } from './question-edit/question-edit.component';
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicFormsMaterialUIModule } from "@ng-dynamic-forms/ui-material";
import { QuillModule } from 'ngx-quill';
import { CourseExamService } from './course-exam.service';
// const routes = [
//   {
//     path: '',
//     component: ExamsComponent,
//     resolve: {
//       data: ExamService
//     }
//   }, {
//     path: ':id',
//     component: ExamComponent,
//     resolve: {
//       data: ExamService
//     }
//   }, {
//     path: ':id/view',
//     component: ExamViewerComponent,
//     resolve: {
//       data: ExamService
//     }
//   }
// ];
@NgModule({
  imports: [
    CommonModule,
    AppFormModule,
    //RouterModule.forChild(routes),
    SharedModule,
    NgxDatatableModule,
    AppListModule,
    DynamicFormsCoreModule,
    DynamicFormsMaterialUIModule,
    QuillModule,
  ],
  declarations: [ExamComponent, ExamsComponent, ExamViewerComponent,QuestionEditComponent],
  exports: [ExamComponent],
  providers: [ControlGeneratorService, ExamService,ExamGeneratorService,CourseExamService],
  entryComponents:[AppFormComponent,QuestionEditComponent]
})
export class ExamModule { }
