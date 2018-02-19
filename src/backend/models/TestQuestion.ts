/* tslint:disable */
import {
  Test,
  UserAnswer,
  CourseScope
} from '../index';

declare var Object: any;
export interface TestQuestionInterface {
  "testId": number;
  "order"?: number;
  "courseScopeId"?: number;
  "name": string;
  "content": string;
  "isOpen": boolean;
  "category"?: Array<string>;
  "correctAnswer"?: Array<string>;
  "maxScore"?: number;
  "ctlType": string;
  "ctlDescription"?: string;
  "ctlOptions"?: Array<string>;
  "id"?: number;
  "deletedAt"?: Date;
  "createdAt": Date;
  "updatedAt": Date;
  test?: Test;
  questonAnswers?: UserAnswer[];
  courseScope?: CourseScope;
}

export class TestQuestion implements TestQuestionInterface {
  "testId": number;
  "order": number;
  "courseScopeId": number;
  "name": string;
  "content": string;
  "isOpen": boolean;
  "category": Array<string>;
  "correctAnswer": Array<string>;
  "maxScore": number;
  "ctlType": string;
  "ctlDescription": string;
  "ctlOptions": Array<string>;
  "id": number;
  "deletedAt": Date;
  "createdAt": Date;
  "updatedAt": Date;
  test: Test;
  questonAnswers: UserAnswer[];
  courseScope: CourseScope;
  constructor(data?: TestQuestionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `TestQuestion`.
   */
  public static getModelName() {
    return "TestQuestion";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of TestQuestion for dynamic purposes.
  **/
  public static factory(data: TestQuestionInterface): TestQuestion{
    return new TestQuestion(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'TestQuestion',
      title:'Pytanie|Pytania',
      plural: 'TestQuestions',
      path: 'TestQuestions',
      idName: 'id',
      properties: {
        "testId": {
          name: 'testId',
          type: 'number',
          title:'Egzamin'
          ,
          required: true 
          
        },
        "order": {
          name: 'order',
          type: 'number',
          title:'Kolejność pytania'
          
          
        },
        "courseScopeId": {
          name: 'courseScopeId',
          type: 'number',
          title:'Zakres szkolenia'
          
          
        },
        "name": {
          name: 'name',
          type: 'string',
          title:'Nazwa'
          ,
          required: true 
          
        },
        "content": {
          name: 'content',
          type: 'string',
          title:'Treść'
          ,
          required: true 
          
        },
        "isOpen": {
          name: 'isOpen',
          type: 'boolean',
          title:'Otwarte'
          ,
          required: true 
          ,
          default: false
        },
        "category": {
          name: 'category',
          type: 'Array<string>',
          title:'Kategoria'
          
          
        },
        "correctAnswer": {
          name: 'correctAnswer',
          type: 'Array<string>',
          title:'Prawidłowa odpowiedź'
          
          
        },
        "maxScore": {
          name: 'maxScore',
          type: 'number',
          title:'Maksymalna ilość punków'
          
          ,
          default: 1
        },
        "ctlType": {
          name: 'ctlType',
          type: 'string',
          title:''
          ,
          required: true 
          
        },
        "ctlDescription": {
          name: 'ctlDescription',
          type: 'string',
          title:'Opis pytania'
          
          
        },
        "ctlOptions": {
          name: 'ctlOptions',
          type: 'Array<string>',
          title:'Opcje odpowiedzi'
          
          
        },
        "id": {
          name: 'id',
          type: 'number',
          title:''
          
          
        },
        "deletedAt": {
          name: 'deletedAt',
          type: 'Date',
          title:''
          
          
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date',
          title:''
          ,
          required: true 
          
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date',
          title:''
          ,
          required: true 
          
        },
      },
      relations: {
        test: {
          name: 'test',
          type: 'Test',
          model: 'Test',
          relationType: 'belongsTo',
                  keyFrom: 'testId',
          keyTo: 'id'
        },
        questonAnswers: {
          name: 'questonAnswers',
          type: 'UserAnswer[]',
          model: 'UserAnswer',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'questionId'
        },
        courseScope: {
          name: 'courseScope',
          type: 'CourseScope',
          model: 'CourseScope',
          relationType: 'belongsTo',
                  keyFrom: 'courseScopeId',
          keyTo: 'id'
        },
      }
    }
  }
}
