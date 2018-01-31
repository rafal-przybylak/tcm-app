import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppFormComponent } from './app-form.component';

const routes: Routes = [
  { path: '', component:AppFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppFormRoutingModule { }
