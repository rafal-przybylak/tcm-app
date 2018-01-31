import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormControlModel, DynamicFormService, DynamicFormValueControlModel, DynamicInputModel, DynamicCheckboxGroupModel, DynamicInputControlModel } from "@ng-dynamic-forms/core";
import { fuseAnimations } from '../../core/animations';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms/src/model';
import { ExamControlsAndValues } from '../services/exam-generator/exam-generator.service';
@Component({
  selector: 'tcm-app-form',
  templateUrl: './app-form.component.html',
  //styleUrls: ['../../../../node_modules/@angular/material/prebuilt-themes/indigo-pink.css'],
  styleUrls: ['./app-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppFormComponent implements OnInit {
  @Input() public formFields: DynamicFormControlModel[];
  @Output() public onSave = new EventEmitter<any>();
  @Input() public formValue: any = {};
  @Input() public objectName: string = "Obiekt";
  @Input() public allowAddNew: boolean = true;
  @Input() public fieldsObservable: Observable<ExamControlsAndValues>;
  @Input() public layout: string = "row wrap";
  @Input() public ctrlAlign :string= "space-between stretch";
  public formGroup: FormGroup;

  constructor(private formService: DynamicFormService) {
    // this.formGroup=new FormGroup({names: new FormControl()});

  }

  ngOnInit() {
    if (this.fieldsObservable != undefined) {
      this.fieldsObservable.subscribe(data => {
        this.formFields = data.controls;

        this.formFields.forEach(element => {
          this.formValue[element.id] = data.values[element.id];

          let control = this.formService.findById(element.id, this.formFields);
          console.log(control.type.indexOf("CHECKBOX_GROUP"));
          if (control.type.indexOf("CHECKBOX_GROUP") > -1) {
            (control as DynamicCheckboxGroupModel).group.forEach(ctrl => {
              (ctrl as DynamicFormValueControlModel<string | string[] | number | boolean | Date>).valueUpdates.subscribe(value => {
                this.formValue[element.id] = value ? this.addToArray(this.formValue[element.id], ctrl.id) : this.removeFromArray(this.formValue[element.id], ctrl.id);
              });
            });
          }
          else {
            (control as DynamicFormValueControlModel<string | string[] | number | boolean | Date>).valueUpdates.subscribe(value => this.formValue[element.id] = value);
          }
        });
        this.formGroup = this.formService.createFormGroup(this.formFields);
        this.objectName = "";
      })
    }
    if (this.fieldsObservable == undefined) {
      this.formFields.forEach(element => {

        let control = this.formService.findById(element.id, this.formFields);
        if (control.type.indexOf("CHECKBOX_GROUP") > -1) {
          (control as DynamicCheckboxGroupModel).group.forEach(ctrl => {
            if (this.formValue != null && this.formValue[element.id] != null) {
              (ctrl as DynamicFormValueControlModel<string | string[] | number | boolean | Date>).value = (this.formValue[element.id].indexOf(ctrl.id) > -1);
            }
            (ctrl as DynamicFormValueControlModel<string | string[] | number | boolean | Date>).valueUpdates.subscribe(value => {
              this.formValue[element.id] = value ? this.addToArray(this.formValue[element.id], ctrl.id) : this.removeFromArray(this.formValue[element.id], ctrl.id);
            });
          });
        }
        else {
          if (this.formValue != null) {
            (control as DynamicFormValueControlModel<string | string[] | number | boolean | Date>).value = this.formValue[element.id];
          }
          (control as DynamicFormValueControlModel<string | string[] | number | boolean | Date>).valueUpdates.subscribe(value => this.formValue[element.id] = value);
        }

      });
      this.formGroup = this.formService.createFormGroup(this.formFields);
    }
  }
  ngOnChanges(changes: SimpleChanges) {

    if (this.formGroup != null) {
      if (changes.formValue != undefined) {

        //   Object.keys(changes.formValue.currentValue).forEach(prop=>{

        //       let c=changes.formValue.currentValue[prop];
        //       if(c instanceof Date)
        //       {
        //       changes.formValue.currentValue[prop]=c.toISOString().substring(0,16);
        //     }

        // })
        this.formGroup.patchValue(changes.formValue.currentValue);
      }
      else if (changes.fieldsObservable.currentValue != undefined) {
        this.formGroup.patchValue(changes.fieldsObservable.currentValue);
      }
    }


  }
  save() {
    this.onSave.emit(this.formValue);
  }
  addNew() {
    this.formValue = {};
    this.formGroup.patchValue(this.formValue);
    this.formFields.forEach(element => {
      let control = this.formService.findById(element.id, this.formFields) as DynamicInputModel;

      control.valueUpdates.next(null);
    });
  }
  addToArray(array: Array<string>, value: string): Array<string> {
    if (array.indexOf(value) > -1) return array;
    else {
      array.push(value);
      return array;
    }
  }
  removeFromArray(array: Array<string>, value: string): Array<string> {
    if (array.indexOf(value) > -1) return array.filter(e => e !== value);
    else return array;
  }
}
