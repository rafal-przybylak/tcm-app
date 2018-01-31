/* tslint:disable */
import {
  Course,
  TestQuestion
} from '../index';

declare var Object: any;
export interface TestInterface {
  "name": string;
  "desc"?: string;
  "courseId": number;
  "required": boolean;
  "startDt": Date;
  "expireDt": Date;
  "id"?: number;
  "createdAt": Date;
  "updatedAt": Date;
  course?: Course;
  testQuestions?: TestQuestion[];
}

export class Test implements TestInterface {
  "name": string;
  "desc": string;
  "courseId": number;
  "required": boolean;
  "startDt": Date;
  "expireDt": Date;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  course: Course;
  testQuestions: TestQuestion[];
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
          
        },
        "desc": {
          name: 'desc',
          type: 'string',
          title:'Opis'
          
        },
        "courseId": {
          name: 'courseId',
          type: 'number',
          title:''
          
        },
        "required": {
          name: 'required',
          type: 'boolean',
          title:'Wymagany'
          ,
          default: true
        },
        "startDt": {
          name: 'startDt',
          type: 'Date',
          title:'Data rozpoczęcia'
          
        },
        "expireDt": {
          name: 'expireDt',
          type: 'Date',
          title:'Data zakńczenia'
          
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
        course: {
          name: 'course',
          type: 'Course',
          model: 'Course',
          relationType: 'belongsTo',
                  keyFrom: 'courseId',
          keyTo: 'id'
        },
        testQuestions: {
          name: 'testQuestions',
          type: 'TestQuestion[]',
          model: 'TestQuestion',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'testId'
        },
      }
    }
  }
}
