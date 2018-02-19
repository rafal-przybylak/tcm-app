/* tslint:disable */
import {
  Course,
  Test,
  UserCourseTest
} from '../index';

declare var Object: any;
export interface CourseTestInterface {
  "courseId": number;
  "testId": number;
  "name": string;
  "startDt": Date;
  "endDt": Date;
  "passingScore": number;
  "id"?: number;
  course?: Course;
  test?: Test;
  userCourseTests?: UserCourseTest[];
}

export class CourseTest implements CourseTestInterface {
  "courseId": number;
  "testId": number;
  "name": string;
  "startDt": Date;
  "endDt": Date;
  "passingScore": number;
  "id": number;
  course: Course;
  test: Test;
  userCourseTests: UserCourseTest[];
  constructor(data?: CourseTestInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CourseTest`.
   */
  public static getModelName() {
    return "CourseTest";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CourseTest for dynamic purposes.
  **/
  public static factory(data: CourseTestInterface): CourseTest{
    return new CourseTest(data);
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
      name: 'CourseTest',
      title:'Egzamin szkolenia|Egzaminy szkolenia',
      plural: 'CourseTests',
      path: 'CourseTests',
      idName: 'id',
      properties: {
        "courseId": {
          name: 'courseId',
          type: 'number',
          title:'Szkolenie'
          ,
          required: true 
          
        },
        "testId": {
          name: 'testId',
          type: 'number',
          title:'Egzamin'
          ,
          required: true 
          
        },
        "name": {
          name: 'name',
          type: 'string',
          title:'Nazwa'
          ,
          required: true 
          
        },
        "startDt": {
          name: 'startDt',
          type: 'Date',
          title:'Data rozpoczęcia'
          ,
          required: true 
          
        },
        "endDt": {
          name: 'endDt',
          type: 'Date',
          title:'Data zakończenia'
          ,
          required: true 
          
        },
        "passingScore": {
          name: 'passingScore',
          type: 'number',
          title:'Zaliczjącz ilość punktów'
          ,
          required: true 
          
        },
        "id": {
          name: 'id',
          type: 'number',
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
        test: {
          name: 'test',
          type: 'Test',
          model: 'Test',
          relationType: 'belongsTo',
                  keyFrom: 'testId',
          keyTo: 'id'
        },
        userCourseTests: {
          name: 'userCourseTests',
          type: 'UserCourseTest[]',
          model: 'UserCourseTest',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'courseTestId'
        },
      }
    }
  }
}
