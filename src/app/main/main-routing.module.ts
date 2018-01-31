
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {AuthGuard} from '../auth-guard.service';
import { DataSource } from '@angular/cdk/collections';
import { CoreConfig } from '../core/api.config';
import { ImportComponent } from './content/import/import.component';
const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full', },
  { path: 'auth-login',   loadChildren: '../core/auth/components/login-2/login-2.module#Login2Module' },
  { path: 'auth-lock',  canActivate: [AuthGuard], loadChildren: '../core/auth/components/lock/lock.module#LockModule'},
  { path: 'auth-mail-confirm',   loadChildren: '../core/auth/components/mail-confirm/mail-confirm.module#MailConfirmModule'},
  { path: 'auth-register',   loadChildren:  '../core/auth/components/register-2/register-2.module#Register2Module'},
  { path: 'auth-reset-pass',   loadChildren: '../core/auth/components/reset-password-2/reset-password-2.module#ResetPassword2Module'},
  { path: 'auth-forgot-pass',   loadChildren: '../core/auth/components/forgot-password-2/forgot-password-2.module#ForgotPassword2Module'},
  { path: 'user',  canActivate: [AuthGuard],data: {  expectedRole: CoreConfig.getAdminRoles()}, loadChildren: './user/user.module#AppUserModule' },
     //{ path: 'sample',  canActivate: [AuthGuard], loadChildren: './content/sample/sample.module#FuseSampleModule' },
    // { path: 'page',   loadChildren: './content/sample.1/page.module#PageModule' },
     { path: 'profile',  canActivate: [AuthGuard], loadChildren: './content/profile/profile.module#ProfileModule' },
     { path: 'courses', loadChildren:'./content/course/course.module#CourseModule' },
     { path: 'user-courses', loadChildren:'./content/course/course.module#CourseModule' },
     // canActivate: [AuthGuard],data: {  expectedRole: []}, loadChildren: './content/course/course.module#CourseModule' },
     { path: 'exams',    canActivate: [AuthGuard], loadChildren: './content/exam/exam-route.module#ExamRouteModule'},
     { path: 'files',canActivate: [AuthGuard],loadChildren:'./content/file-manager/file-manager.module#FuseFileManagerModule'},
     { path: 'import', component:ImportComponent},
    { path: '**', redirectTo: 'courses' },
  ];
   
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class MainRoutingModule {
  }
 