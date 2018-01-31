import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TestQuestion, TestQuestionApi, Test } from '../../../../../backend/index';
import { ControlGeneratorService } from '../../../app-form/control-generator.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DynamicFormService, DynamicSelectModel, DynamicCheckboxGroupModel, DynamicFormValueControlModel } from '@ng-dynamic-forms/core';
import { AbstractControl } from '@angular/forms/src/model';
import { ExamConfig } from '../../../services/exam-generator/exam-config';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import Quill from 'quill';

// add image resize module
// import ImageResize from 'quill-image-resize-module';
// Quill.register('modules/imageResize', ImageResize);

// override p with div tag
const Parchment = Quill.import('parchment');
let Block = Parchment.query('block');

Block.tagName = 'DIV';
// or class NewBlock extends Block {}; NewBlock.tagName = 'DIV';
Quill.register(Block /* or NewBlock */, true);

//import Counter from './counter';
//Quill.register('modules/counter', Counter)

// Add fonts to whitelist
var Font = Quill.import('formats/font');
// We do not add Aref Ruqaa since it is the default
Font.whitelist = ['mirza', 'aref', 'sans-serif', 'monospace', 'serif'];
Quill.register(Font, true);
@Component({
  selector: 'tcm-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.scss']
})
export class QuestionEditComponent implements OnInit {
  objectName:string=TestQuestion.getModelDefinition().title.split("|")[0];
  objectModel:TestQuestion=new TestQuestion();
  objectFields:any;
  public formGroup: FormGroup;
  @Input() public tesetId:number;
  @Output() public onSave = new EventEmitter<any>();
  constructor(private formServ: DynamicFormService,private formService: ControlGeneratorService, private testQuestApi: TestQuestionApi ) {
    let dynamicFields=Object.assign({},TestQuestion.getModelDefinition());
    delete dynamicFields.properties.category
    delete dynamicFields.properties.content;
    this.objectFields = this.formService.getFormControlModel(dynamicFields);
    this.objectFields.push(new DynamicSelectModel({
      id: "ctlType",
      placeholder:"Typ pytania",
      required: true,  
      hint: "Określ rodzaj kontrolki dla pytania",
      options:ExamConfig.ControlOptions
    }));
    this.objectFields.push(new DynamicSelectModel({
      id: "category",
      placeholder:"Kategoria",
      required: true,  
      hint: "Określ kategorię pytania",
      multiple:true,
      options:ExamConfig.QuestionCategory
    }));
    
   
  }

  ngOnInit() {
    if(this.objectModel){
      this.objectFields.forEach(element => {

        let control = this.formServ.findById(element.id, this.objectFields);
        if (control.type.indexOf("CHECKBOX_GROUP") > -1) {
          (control as DynamicCheckboxGroupModel).group.forEach(ctrl => {
            if (this.objectModel != null && this.objectModel[element.id] != null) {
              (ctrl as DynamicFormValueControlModel<string | string[] | number | boolean | Date>).value = (this.objectModel[element.id].indexOf(ctrl.id) > -1);
            }
           
          });
        }
        else {
            (control as DynamicFormValueControlModel<string | string[] | number | boolean | Date>).value = this.objectModel[element.id];
         }

      });
    }
    this.formGroup = this.formServ.createFormGroup(this.objectFields);
    this.formGroup.addControl("content",new FormControl())
    this.formGroup.controls["content"].patchValue(this.objectModel.content);
  }
save(){
  (this.formGroup.value as TestQuestion).testId=this.tesetId;
  if(this.objectModel.id>0){
    
    this.testQuestApi.updateAttributes(this.objectModel.id,this.formGroup.value).subscribe(resp => {
      this.onSave.next(resp);
    });
  }else{
    this.testQuestApi.create(this.formGroup.value).subscribe(resp => {

      this.onSave.next(resp);
    });
  }
  
}
addToArray(array: Array<string>, value: string): Array<string> {
  if (array.indexOf(value) > -1) return array;
  else {
    array.push(value);
    return array;
  }
}
}
