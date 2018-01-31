import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppListComponent } from './app-list.component';
import { SharedModule } from '../../core/modules/shared.module';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule
  ],
  declarations: [AppListComponent],
  exports:[AppListComponent]
})
export class AppListModule { }
