import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../core/modules/shared.module';
//import { AppFormRoutingModule } from './app-form-routing.module';
import { AppFormComponent } from './app-form.component';
import {ReactiveFormsModule} from '@angular/forms';
//import {FormlyModule} from '@ngx-formly/core';
//import {FormlyMaterialModule} from '@ngx-formly/material';
//import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';
//import { FormDatePickerComponent } from './form-date-picker/form-date-picker.component';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicFormsMaterialUIModule } from "@ng-dynamic-forms/ui-material";
import { ControlGeneratorService } from './control-generator.service';

@NgModule({
  imports: [
    CommonModule,
    //AppFormRoutingModule,
    ReactiveFormsModule,
    // FormlyModule.forRoot({
    //   types: [{
    //     name: 'datepicker', component: FormDatePickerComponent, extends: 'input'
    //   }]
    // }),
    // //FormlyMaterialModule,
    // FormlyBootstrapModule,
    SharedModule,
    //FormsModule,
    //NgbModule.forRoot(),
    DynamicFormsCoreModule.forRoot(),DynamicFormsMaterialUIModule,
  ],
  declarations: [AppFormComponent ],
  exports:[AppFormComponent,SharedModule],
  providers:[ControlGeneratorService]

  
})
export class AppFormModule { }
