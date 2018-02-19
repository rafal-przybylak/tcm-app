/* tslint:disable */
import {
  CourseScope,
  User
} from '../index';

declare var Object: any;
export interface TrainerCourseScopeInterface {
  "id"?: number;
  "courseScopeId"?: number;
  "trainerId"?: number;
  "createdAt": Date;
  "updatedAt": Date;
  courseScope?: CourseScope;
  trainer?: User;
}

export class TrainerCourseScope implements TrainerCourseScopeInterface {
  "id": number;
  "courseScopeId": number;
  "trainerId": number;
  "createdAt": Date;
  "updatedAt": Date;
  courseScope: CourseScope;
  trainer: User;
  constructor(data?: TrainerCourseScopeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `TrainerCourseScope`.
   */
  public static getModelName() {
    return "TrainerCourseScope";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of TrainerCourseScope for dynamic purposes.
  **/
  public static factory(data: TrainerCourseScopeInterface): TrainerCourseScope{
    return new TrainerCourseScope(data);
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
      name: 'TrainerCourseScope',
      title:'',
      plural: 'TrainerCourseScopes',
      path: 'TrainerCourseScopes',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number',
          title:''
          
          
        },
        "courseScopeId": {
          name: 'courseScopeId',
          type: 'number',
          title:''
          
          
        },
        "trainerId": {
          name: 'trainerId',
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
        courseScope: {
          name: 'courseScope',
          type: 'CourseScope',
          model: 'CourseScope',
          relationType: 'belongsTo',
                  keyFrom: 'courseScopeId',
          keyTo: 'id'
        },
        trainer: {
          name: 'trainer',
          type: 'User',
          model: 'User',
          relationType: 'belongsTo',
                  keyFrom: 'trainerId',
          keyTo: 'id'
        },
      }
    }
  }
}
