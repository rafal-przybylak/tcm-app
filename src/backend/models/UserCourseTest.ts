/* tslint:disable */
import {
  UserAnswer,
  CourseTest,
  User
} from '../index';

declare var Object: any;
export interface UserCourseTestInterface {
  "courseTestId": number;
  "userId": number;
  "completeDt"?: Date;
  "checkDt"?: Date;
  "score"?: number;
  "scorePercent"?: number;
  "passed"?: boolean;
  "id"?: number;
  userAnswers?: UserAnswer[];
  courseTest?: CourseTest;
  user?: User;
}

export class UserCourseTest implements UserCourseTestInterface {
  "courseTestId": number;
  "userId": number;
  "completeDt": Date;
  "checkDt": Date;
  "score": number;
  "scorePercent": number;
  "passed": boolean;
  "id": number;
  userAnswers: UserAnswer[];
  courseTest: CourseTest;
  user: User;
  constructor(data?: UserCourseTestInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UserCourseTest`.
   */
  public static getModelName() {
    return "UserCourseTest";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of UserCourseTest for dynamic purposes.
  **/
  public static factory(data: UserCourseTestInterface): UserCourseTest{
    return new UserCourseTest(data);
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
      name: 'UserCourseTest',
      title:'Egzamin uszestnika|Egzaminy uszestników',
      plural: 'UserCourseTests',
      path: 'UserCourseTests',
      idName: 'id',
      properties: {
        "courseTestId": {
          name: 'courseTestId',
          type: 'number',
          title:'Egzamin szkolenia'
          ,
          required: true 
          
        },
        "userId": {
          name: 'userId',
          type: 'number',
          title:'Uczestnik'
          ,
          required: true 
          
        },
        "completeDt": {
          name: 'completeDt',
          type: 'Date',
          title:'Data wykonania testu'
          
          
        },
        "checkDt": {
          name: 'checkDt',
          type: 'Date',
          title:'Data sprawdzenia testu'
          
          
        },
        "score": {
          name: 'score',
          type: 'number',
          title:'Wynik (punkty)'
          
          
        },
        "scorePercent": {
          name: 'scorePercent',
          type: 'number',
          title:'Wynik (%)'
          
          
        },
        "passed": {
          name: 'passed',
          type: 'boolean',
          title:'Egzamin zaliczoy (Tak/Nie)'
          
          
        },
        "id": {
          name: 'id',
          type: 'number',
          title:''
          
          
        },
      },
      relations: {
        userAnswers: {
          name: 'userAnswers',
          type: 'UserAnswer[]',
          model: 'UserAnswer',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userCourseTestId'
        },
        courseTest: {
          name: 'courseTest',
          type: 'CourseTest',
          model: 'CourseTest',
          relationType: 'belongsTo',
                  keyFrom: 'courseTestId',
          keyTo: 'id'
        },
        user: {
          name: 'user',
          type: 'User',
          model: 'User',
          relationType: 'belongsTo',
                  keyFrom: 'userId',
          keyTo: 'id'
        },
      }
    }
  }
}
