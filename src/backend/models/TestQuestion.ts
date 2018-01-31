/* tslint:disable */
import {
  Test,
  UserAnswer
} from '../index';

declare var Object: any;
export interface TestQuestionInterface {
  "testId": number;
  "name": string;
  "content": string;
  "isOpen": boolean;
  "category"?: Array<string>;
  "correctAnswer"?: Array<string>;
  "ctlType": string;
  "ctlDescription"?: string;
  "ctlOptions"?: Array<string>;
  "id"?: number;
  "createdAt": Date;
  "updatedAt": Date;
  test?: Test;
  questonAnswers?: UserAnswer[];
}

export class TestQuestion implements TestQuestionInterface {
  "testId": number;
  "name": string;
  "content": string;
  "isOpen": boolean;
  "category": Array<string>;
  "correctAnswer": Array<string>;
  "ctlType": string;
  "ctlDescription": string;
  "ctlOptions": Array<string>;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  test: Test;
  questonAnswers: UserAnswer[];
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
          title:''
          
        },
        "name": {
          name: 'name',
          type: 'string',
          title:'Nazwa'
          
        },
        "content": {
          name: 'content',
          type: 'string',
          title:'Treść'
          
        },
        "isOpen": {
          name: 'isOpen',
          type: 'boolean',
          title:'Otwarte'
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
        "ctlType": {
          name: 'ctlType',
          type: 'string',
          title:''
          
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
        "createdAt": {
          name: 'createdAt',
          type: 'Date',
          title:''
          
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date',
          title:''
          
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
      }
    }
  }
}
