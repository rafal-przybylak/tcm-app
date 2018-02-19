

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
  DynamicFormGroupModel,
  DynamicCheckboxGroupModel,
  DynamicSelectModel
} from "@ng-dynamic-forms/core";
import { TestApi, TestQuestion, UserAnswer, UserApi, UserCourseTestApi, UserCourseTest, CourseTest,Test } from '../../../../backend/index';
import { ControlType } from './exam-config';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/zip";
import { UserAnswerApi } from '../../../../backend/services/index'

@Injectable()
export class ExamGeneratorService {

  constructor(private userApi: UserApi, private testApi: TestApi, private userTestApi: UserCourseTestApi) { }

  getControlsWithValueModel(courseTest: CourseTest, userId: number,testId:number=null): Observable<ExamControlsAndValues> {
    let exam: Observable<TestQuestion[]>;
    let answers: Observable<UserCourseTest[]>;
    if(!testId){
     exam = this.testApi.getTestQuestions(courseTest.testId, { order: 'order ASC' });
     answers = this.userTestApi.find<UserCourseTest>({ where: { courseTestId: courseTest.id, userId: userId }, include: ["userAnswers"] });
    }else{
      exam = this.testApi.getTestQuestions(testId, { order: 'order ASC' });
      answers = Observable.of([]);
    }
    
    // .map( userTest =>{     return userTest.length? userTest[0].userAnswers:[]; }) 

    return Observable.zip(exam, answers, (questions: TestQuestion[], userTest: UserCourseTest[]) => {
      let answers = userTest.length ? userTest[0].userAnswers : [];
      let formControls: DynamicFormControlModel[] = new Array<DynamicFormControlModel>();
      let controlValues: any = {};
      questions.forEach(quest => {
        let qValue = answers.find(x => x.questionId == quest.id);
        let ctlr = null;
        switch (quest.ctlType) {
          case ControlType.string:
            ctlr = new DynamicInputModel({
              id: quest.name + "$$" + quest.id.toString(),
              label: quest.ctlDescription,
              placeholder: quest.ctlDescription,
              //required: true,
              value: (qValue == undefined ? null : qValue.value)
            }, {
                element: {
                  container: "form-ctrl",
                  label: "control-label"
                },
                grid: {
                  control: "control-value",
                  label: "col-sm-3"
                }
              });

            controlValues[quest.name + "$$" + quest.id.toString()] = (qValue == undefined ? null : qValue.value);
            break;
          case ControlType.string_array:

            ctlr = new DynamicInputModel(
              {
                id: quest.name + "$$" + quest.id.toString(),
                label: quest.ctlDescription,
                placeholder: quest.ctlDescription,
                //required: true,
                multiple: true,
                value: (qValue == undefined ? null : qValue.value)
              }, {
                element: {
                  container: "form-ctrl",
                  label: "control-label"
                },
                grid: {
                  control: "control-value",
                  label: "col-sm-3"
                }
              }
            );

            controlValues[quest.name + "$$" + quest.id.toString()] = (qValue == undefined ? null : qValue.value);
            break;
          case ControlType.text:
            ctlr = new DynamicTextAreaModel(
              {
                id: quest.name + "$$" + quest.id.toString(),
                label: quest.ctlDescription,
                placeholder: quest.ctlDescription,
                rows: 5,
                //required: true,
                value: (qValue == undefined || qValue.value == undefined ? null : qValue.value[0])
              }, {
                element: {
                  container: "form-ctrl",
                  label: "control-label"
                },
                grid: {
                  control: "control-value",
                  label: "col-sm-3"
                }
              }
            );

            controlValues[quest.name + "$$" + quest.id.toString()] = (qValue == undefined ? null : qValue.value);
            break;
          case ControlType.number:
            ctlr = new DynamicInputModel({
              id: quest.name + "$$" + quest.id.toString(),
              label: quest.ctlDescription,
              placeholder: quest.ctlDescription,
              required: true,
              inputType: "number",
              value: (qValue == undefined ? null : qValue.value[0])

            }, {
                element: {
                  container: "form-ctrl",
                  label: "control-label"
                },
                grid: {
                  control: "control-value",
                  label: "col-sm-3"
                }
              }
            );
            controlValues[quest.name + "$$" + quest.id.toString()] = (qValue == undefined ? null : qValue.value);
            break;
          case ControlType.date:
            ctlr = new DynamicDatePickerModel({
              id: quest.name + "$$" + quest.id.toString(),
              label: quest.ctlDescription,
              placeholder: quest.ctlDescription,
              //required: true,
              value: (qValue == undefined ? null : qValue.value[0])
            }, {
                element: {
                  container: "form-ctrl",
                  label: "control-label"
                },
                grid: {
                  control: "control-value",
                  label: "col-sm-3"
                }
              }
            );
            controlValues[quest.name + "$$" + quest.id.toString()] = (qValue == undefined ? null : qValue.value);
            break;
          case ControlType.checkboxGroup:
            let chkOptions: any[] = [];
            quest.ctlOptions.forEach(option => {
              chkOptions.push(new DynamicCheckboxModel({
                id: option,
                label: option,
                value: (qValue == undefined || qValue.value == undefined) ? false : (qValue.value.indexOf(option) != -1)
              })
              )
            });
            ctlr = new DynamicCheckboxGroupModel({
              id: quest.name + "$$" + quest.id.toString(),
              label: quest.ctlDescription,
              group: chkOptions
            }, {
                element: {
                  container: "form-ctrl",
                  label: "control-label"
                },
                grid: {
                  control: "control-value",
                  label: "col-sm-3"
                }
              }
            );
            controlValues[quest.name + "$$" + quest.id.toString()] = (qValue == undefined ? null : qValue.value);
            break;
          case ControlType.radioGroup:
            let radioOptions: any[] = [];
            quest.ctlOptions.forEach(option => {
              radioOptions.push({
                value: option,
                label: option
              })
            });
            ctlr = new DynamicRadioGroupModel<string>({
              id: quest.name + "$$" + quest.id.toString(),
              label: quest.ctlDescription,
              options: radioOptions,
              value: qValue == undefined || qValue.value == undefined ? null : qValue.value[0]
            }, {
                element: {
                  container: "form-ctrl",
                  label: "control-label"
                },
                grid: {
                  control: "control-value",
                  label: "col-sm-3"
                }
              }
            );
            controlValues[quest.name + "$$" + quest.id.toString()] = (qValue == undefined ? null : qValue.value);
            break;
          case ControlType.select:
            let selectOptions: any[] = [];
            quest.ctlOptions.forEach(option => {
              selectOptions.push({
                value: option,
                label: option
              })
            });
            ctlr = new DynamicSelectModel({
              id: quest.name + "$$" + quest.id.toString(),
              label: quest.ctlDescription,
              options: selectOptions,
              placeholder: quest.ctlDescription,
              value: qValue == undefined ? null : qValue.value[0]
            }, {
                element: {
                  container: "form-ctrl",
                  label: "control-label"
                },
                grid: {
                  control: "control-value",
                  label: "col-sm-3"
                }
              }
            );
            controlValues[quest.name + "$$" + quest.id.toString()] = (qValue == undefined ? null : qValue.value);
            break;
          case ControlType.select_multi:
            let mSelectOptions: any[] = [];
            quest.ctlOptions.forEach(option => {
              mSelectOptions.push({
                value: option,
                label: option
              })
            });
            ctlr = new DynamicSelectModel({
              id: quest.name + "$$" + quest.id.toString(),
              label: quest.ctlDescription,
              multiple: true,
              options: mSelectOptions,
              placeholder: quest.ctlDescription,
              value: qValue == undefined ? null : qValue.value
            }, {
                element: {
                  container: "form-ctrl",
                  label: "control-label"
                },
                grid: {
                  control: "control-value",
                  label: "col-sm-3"
                }
              }
            );
            controlValues[quest.name + "$$" + quest.id.toString()] = (qValue == undefined ? null : qValue.value);
            break;
        }
        ctlr["content"] = quest.content;
        formControls.push(ctlr);
      });
      return { controls: formControls, values: controlValues,userTests:userTest };
    });

  }
  propString = (property: (object: any) => void) => {
    var chaine = property.toString();
    var arr = chaine.match(/[\s\S]*{[\s\S]*\.([^\.; ]*)[ ;\n]*}/);
    return arr[1];
  }
}
export interface ExamControlsAndValues {
  controls: DynamicFormControlModel[];
  values: any;
  userTests:UserCourseTest[];
}
export interface ExamControls {
  controls: DynamicFormControlModel[];
  type: any;
}