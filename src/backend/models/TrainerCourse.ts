/* tslint:disable */
import {
  User,
  Course
} from '../index';

declare var Object: any;
export interface TrainerCourseInterface {
  "id"?: number;
  "userId"?: number;
  "courseId"?: number;
  "createdAt": Date;
  "updatedAt": Date;
  user?: User;
  course?: Course;
}

export class TrainerCourse implements TrainerCourseInterface {
  "id": number;
  "userId": number;
  "courseId": number;
  "createdAt": Date;
  "updatedAt": Date;
  user: User;
  course: Course;
  constructor(data?: TrainerCourseInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `TrainerCourse`.
   */
  public static getModelName() {
    return "TrainerCourse";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of TrainerCourse for dynamic purposes.
  **/
  public static factory(data: TrainerCourseInterface): TrainerCourse{
    return new TrainerCourse(data);
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
      name: 'TrainerCourse',
      title:'Szkolenie/Trener|Szkolenia/Trenerzy',
      plural: 'TrainerCourses',
      path: 'TrainerCourses',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number',
          title:''
          
          
        },
        "userId": {
          name: 'userId',
          type: 'number',
          title:''
          
          
        },
        "courseId": {
          name: 'courseId',
          type: 'number',
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
