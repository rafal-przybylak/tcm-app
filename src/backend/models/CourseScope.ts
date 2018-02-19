/* tslint:disable */
import {
  TestQuestion,
  User
} from '../index';

declare var Object: any;
export interface CourseScopeInterface {
  "name": string;
  "desc"?: string;
  "id"?: number;
  testQuestions?: TestQuestion[];
  trainers?: User[];
}

export class CourseScope implements CourseScopeInterface {
  "name": string;
  "desc": string;
  "id": number;
  testQuestions: TestQuestion[];
  trainers: User[];
  constructor(data?: CourseScopeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CourseScope`.
   */
  public static getModelName() {
    return "CourseScope";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CourseScope for dynamic purposes.
  **/
  public static factory(data: CourseScopeInterface): CourseScope{
    return new CourseScope(data);
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
      name: 'CourseScope',
      title:'Zakres szkolenia|Zakresy szkoleń',
      plural: 'CourseScopes',
      path: 'CourseScopes',
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
        "id": {
          name: 'id',
          type: 'number',
          title:''
          
          
        },
      },
      relations: {
        testQuestions: {
          name: 'testQuestions',
          type: 'TestQuestion[]',
          model: 'TestQuestion',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'courseScopeId'
        },
        trainers: {
          name: 'trainers',
          type: 'User[]',
          model: 'User',
          relationType: 'hasMany',
          modelThrough: 'TrainerCourseScope',
          keyThrough: 'userId',
          keyFrom: 'id',
          keyTo: 'courseScopeId'
        },
      }
    }
  }
}
