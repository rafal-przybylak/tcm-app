/* tslint:disable */
import {
  User,
  Course
} from '../index';

declare var Object: any;
export interface UserCourseInterface {
  "courseId"?: number;
  "userId"?: number;
  "createdAt": Date;
  "updatedAt": Date;
  user?: User;
  course?: Course;
}

export class UserCourse implements UserCourseInterface {
  "courseId": number;
  "userId": number;
  "createdAt": Date;
  "updatedAt": Date;
  user: User;
  course: Course;
  constructor(data?: UserCourseInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UserCourse`.
   */
  public static getModelName() {
    return "UserCourse";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of UserCourse for dynamic purposes.
  **/
  public static factory(data: UserCourseInterface): UserCourse{
    return new UserCourse(data);
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
      name: 'UserCourse',
      title:'Szkolenie użytkownika|Szkolenia użytkownika',
      plural: 'UserCourses',
      path: 'UserCourses',
      idName: 'courseId',
      properties: {
        "courseId": {
          name: 'courseId',
          type: 'number',
          title:''
          
        },
        "userId": {
          name: 'userId',
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
        user: {
          name: 'user',
          type: 'User',
          model: 'User',
          relationType: 'belongsTo',
                  keyFrom: 'userId',
          keyTo: 'id'
        },
        course: {
          name: 'course',
          type: 'Course',
          model: 'Course',
          relationType: 'belongsTo',
                  keyFrom: 'courseId',
          keyTo: 'id'
        },
      }
    }
  }
}
