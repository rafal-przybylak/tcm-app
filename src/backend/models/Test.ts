/* tslint:disable */
import {
  TestQuestion,
  CourseTest
} from '../index';

declare var Object: any;
export interface TestInterface {
  "name": string;
  "desc"?: string;
  "maxScore"?: number;
  "id"?: number;
  "deletedAt"?: Date;
  "createdAt": Date;
  "updatedAt": Date;
  testQuestions?: TestQuestion[];
  courseTests?: CourseTest[];
}

export class Test implements TestInterface {
  "name": string;
  "desc": string;
  "maxScore": number;
  "id": number;
  "deletedAt": Date;
  "createdAt": Date;
  "updatedAt": Date;
  testQuestions: TestQuestion[];
  courseTests: CourseTest[];
  constructor(data?: TestInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Test`.
   */
  public static getModelName() {
    return "Test";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Test for dynamic purposes.
  **/
  public static factory(data: TestInterface): Test{
    return new Test(data);
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
      name: 'Test',
      title:'Egzamin|Egazaminy',
      plural: 'Tests',
      path: 'Tests',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string',
          title:'Nazwa'
          ,
          required: true 
          
        },
        "desc": {
          name: 'desc',
          type: 'string',
          title:'Opis'
          
          
        },
        "maxScore": {
          name: 'maxScore',
          type: 'number',
          title:'Maksymalna ilość punków'
          
          
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
        testQuestions: {
          name: 'testQuestions',
          type: 'TestQuestion[]',
          model: 'TestQuestion',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'testId'
        },
        courseTests: {
          name: 'courseTests',
          type: 'CourseTest[]',
          model: 'CourseTest',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'testId'
        },
      }
    }
  }
}
