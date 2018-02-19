/* tslint:disable */
import {
  Course,
  User
} from '../index';

declare var Object: any;
export interface CourseCandidateInterface {
  "userId": number;
  "courseId": number;
  "requestDt": Date;
  "desc"?: string;
  "cancelledDt"?: Date;
  "cancelledInfo"?: string;
  "id"?: number;
  "deletedAt"?: Date;
  "createdAt": Date;
  "updatedAt": Date;
  course?: Course;
  user?: User;
}

export class CourseCandidate implements CourseCandidateInterface {
  "userId": number;
  "courseId": number;
  "requestDt": Date;
  "desc": string;
  "cancelledDt": Date;
  "cancelledInfo": string;
  "id": number;
  "deletedAt": Date;
  "createdAt": Date;
  "updatedAt": Date;
  course: Course;
  user: User;
  constructor(data?: CourseCandidateInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CourseCandidate`.
   */
  public static getModelName() {
    return "CourseCandidate";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CourseCandidate for dynamic purposes.
  **/
  public static factory(data: CourseCandidateInterface): CourseCandidate{
    return new CourseCandidate(data);
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
      name: 'CourseCandidate',
      title:'Kandydat na szkolenie|Kandydaci na szkolenia',
      plural: 'CourseCandidates',
      path: 'CourseCandidates',
      idName: 'id',
      properties: {
        "userId": {
          name: 'userId',
          type: 'number',
          title:''
          ,
          required: true 
          
        },
        "courseId": {
          name: 'courseId',
          type: 'number',
          title:''
          ,
          required: true 
          
        },
        "requestDt": {
          name: 'requestDt',
          type: 'Date',
          title:'Data zgłoszenia'
          ,
          required: true 
          
        },
        "desc": {
          name: 'desc',
          type: 'string',
          title:'Informacja dla organizatora (opcjonalnie)'
          
          
        },
        "cancelledDt": {
          name: 'cancelledDt',
          type: 'Date',
          title:'Data rezygnacji '
          
          
        },
        "cancelledInfo": {
          name: 'cancelledInfo',
          type: 'string',
          title:'Powód anulowania zgłoszenia'
          
          
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
        course: {
          name: 'course',
          type: 'Course',
          model: 'Course',
          relationType: 'belongsTo',
                  keyFrom: 'courseId',
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
