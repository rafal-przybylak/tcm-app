import { Component, OnInit } from '@angular/core';
import { NbAuthResult, NbAuthService } from '../../../../core/auth/services/auth.service';
import { CourseApi, Course, LoopBackFilter, LoopBackAuth } from '../../../../../backend/index';
import { ActivatedRoute } from '@angular/router';
//import { AppFormComponent } from '../../app-form/app-form.component';
//import {FormlyFieldConfig} from '@ngx-formly/core';
import { fuseAnimations } from '../../../../core/animations';

import {
  DynamicFormControlModel,
  DynamicCheckboxModel,
  DynamicInputModel,
  DynamicRadioGroupModel,
  DynamicDateControlModel,
  DynamicDatePickerModel
} from "@ng-dynamic-forms/core";
import { now } from 'moment';
import { ControlGeneratorService } from '../../../app-form/control-generator.service';
import { AdminElementDirective } from '../../../../core/directives/admin-element.directive';
import { Router } from '@angular/router';
import { UserApi } from '../../../../../backend/services/custom/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../../../../core/services/dialog.service';

@Component({
  selector: 'tcm-course',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  animations: fuseAnimations
})
export class CourseListComponent implements OnInit {
  public form: FormGroup;
  formErrors: any;
  public courseModel: any ={};// { "name": " ", "desc": " ", "startDt": new Date(), "endDt": new Date(), goelocLat: 0, goelocLong: 0, tags: " ", free: false };
  public sub: any;
  public courseFields: DynamicFormControlModel[];
  private modelDefinition: any = Course.getModelDefinition();
  public courses: Array<Course>;
  public objectName: string = this.modelDefinition.title;
  public currentDate = new Date().toISOString();

  constructor(private confirmService: DialogService, private auth: NbAuthService, private formBuilder: FormBuilder, private loopbackApi: LoopBackAuth, private coursApi: CourseApi, private userApi: UserApi, private router: Router, private route: ActivatedRoute, private formService: ControlGeneratorService) {

    this.formErrors = {
      name: {},
      startDt: {},
      endDt: {},
      desc: {},
      free: {},
      fundingEU: {},
      goelocLat: {},
      goelocLong: {}
    }
    let filter: LoopBackFilter = {};
    this.courseFields = formService.getFormControlModel(this.modelDefinition);
    if (this.router.url == "/user-courses") {
      this.userApi.getCourses(this.loopbackApi.getCurrentUserData().id).subscribe(data => {
        this.courses = data;
        this.courseModel = this.courses[0];
      });
    }
    else {
      this.coursApi.find<Course>().subscribe(data => {
        this.courses = data;
        if (this.courses.length > 0) {
          this.courseModel = this.courses[0];
          //this.form.patchValue(this.courseModel);
        }
      });
    }
  }

  ngOnInit() {

    this.form = this.formBuilder.group({

      name: ['', Validators.required],
      startDt: ['', Validators.required],
      endDt: ['', Validators.required],
      desc: ['', Validators.required],
      purpose: '',
      agenda: '',
      recipient: '',
      free: '',
      fundingEU:''

    });
    //this.form.patchValue(this.courseModel);
    this.form.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });

  }
  onFormValuesChanged() {
    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.formErrors[field] = {};

      // Get the control
      const control = this.form.get(field);

      if (control && control.dirty && !control.valid) {
        this.formErrors[field] = control.errors;
      }
    }
  }
  placeMarker($event) {
    this.courseModel.goelocLat = $event.coords.lat;
    this.courseModel.goelocLong = $event.coords.lng;
  }
  addNew() {
    this.courseModel = new Course();
  }
  save(data: any) {
    if (this.courseModel.id != null) {
      this.coursApi.upsert(this.courseModel).subscribe(c => console.log(c));
    }
    else {
      this.coursApi.create(this.courseModel).subscribe(c => this.courses.push(c), error => console.log(error));

    }
  }

  setCourse(event:Event, id: number) {
    this.courseModel = this.courses.find(x => x.id == id);
    //this.form.patchValue(this.courseModel);
    event.stopPropagation();
  }
  deleteCourse(event:Event,id: number) {
    let confirm = this.confirmService.confirm("Czy jesteś pewien?", "Usunięcie szkolenia spowoduje usunięcie wszystkich imformacji z nim zwiazanych!")

    confirm.afterClosed().subscribe(result => {
      if (result) {
        this.coursApi.deleteById<Course>(id).subscribe(c => {
          this.courses = [...this.courses.filter(x => x.id != id)];
          this.courseModel = this.courses.length > 0 ? this.courses[0] : new Course();

        });
      }
    });

    //this.form.patchValue(this.courseModel);
    event.stopPropagation();
  }
  onDetails(id: number) {
    this.router.navigate(["courses", id]);
  }
}
