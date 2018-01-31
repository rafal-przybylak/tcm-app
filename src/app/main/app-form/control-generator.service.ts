import { Injectable } from '@angular/core';
import {
  DynamicFormControlModel,
  DynamicCheckboxModel,
  DynamicInputModel,
  DynamicRadioGroupModel,
  DynamicDateControlModel,
  DynamicDatePickerModel,
  AUTOFILL_FIELD_ADDRESS_LEVEL_1,
  DynamicTextAreaModel,
  DynamicFormGroupModel
} from "@ng-dynamic-forms/core";

@Injectable()
export class ControlGeneratorService {

  constructor() { }

  getFormControlModel(modelDef: any): DynamicFormControlModel[] {
    let formControls: DynamicFormControlModel[] = new Array<DynamicFormControlModel>();

    Object.keys(modelDef.properties).forEach(propName => {
      if (propName != modelDef.idName && modelDef.properties[propName].title!="undefined" && modelDef.properties[propName].title!="") {
        switch (modelDef.properties[propName].type.toLowerCase()) {
          case "string":
            if (propName != "desc" && propName != "content") {
              formControls.push(
                new DynamicInputModel({
                  id: propName,
                  placeholder: modelDef.properties[propName].title,
                  required: modelDef.properties[propName].required ? true : false,
                })
              );
            }
            else {
              formControls.push(
                new DynamicTextAreaModel(
                  {
                    id: propName,
                    rows: 3,
                    placeholder: modelDef.properties[propName].title,
                    required: modelDef.properties[propName].required ? true : false
                  }
                ));
            }
            break;
          case "number":
            formControls.push(
              new DynamicInputModel({
                id: propName,
                placeholder: modelDef.properties[propName].title,
                required: modelDef.properties[propName].required ? true : false,
                inputType: "number",

              })
            );
            break;
          case "date":
            formControls.push(
              new DynamicDatePickerModel({
                id: propName,
                placeholder: modelDef.properties[propName].title,
                required: modelDef.properties[propName].required ? true : false,
                
              })
            );
            break;
            // case "date":
            // formControls.push(
            //   new DynamicInputModel({
            //     id: propName,
            //     placeholder: modelDef.properties[propName].title,
            //     required: modelDef.properties[propName].required ? true : false,
            //     inputType:"date"
            //   })
            // );
            // break;
          case "array<string>":
            formControls.push(
              new DynamicInputModel({
                id: propName,
                placeholder: modelDef.properties[propName].title,
                required: modelDef.properties[propName].required ? true : false,
                multiple: true
              })
            );
            break;
          case "boolean":
            formControls.push(
              new DynamicCheckboxModel({
                id: propName,
                label: modelDef.properties[propName].title
              })
            );
            break;
          default:
            formControls.push(
              new DynamicInputModel({
                id: propName,
                placeholder: modelDef.properties[propName].title,
                required: modelDef.properties[propName].required ? true : false,
              })
            );
        }
      }
    })
   
 return formControls;
  //   return [new DynamicFormGroupModel(
  //     {
  //         id: modelDef.name,
  //         group: formControls
  // })];
  }
}
