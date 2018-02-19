/* tslint:disable */
import {
  User,
  Media,
  MediaLink,
  CourseTest,
  CourseCandidate
} from '../index';

declare var Object: any;
export interface CourseInterface {
  "name"?: string;
  "startDt": Date;
  "endDt": Date;
  "logoMediaId"?: number;
  "purpose"?: string;
  "agenda"?: string;
  "recipient"?: string;
  "desc"?: string;
  "free"?: boolean;
  "goelocLat"?: number;
  "goelocLong"?: number;
  "fundingEU"?: boolean;
  "id"?: number;
  "deletedAt"?: Date;
  "createdAt": Date;
  "updatedAt": Date;
  "mediaId"?: number;
  users?: User[];
  logoMedia?: Media;
  files?: MediaLink[];
  courseTests?: CourseTest[];
  trainers?: User[];
  candidates?: CourseCandidate[];
}

export class Course implements CourseInterface {
  "name": string;
  "startDt": Date;
  "endDt": Date;
  "logoMediaId": number;
  "purpose": string;
  "agenda": string;
  "recipient": string;
  "desc": string;
  "free": boolean;
  "goelocLat": number;
  "goelocLong": number;
  "fundingEU": boolean;
  "id": number;
  "deletedAt": Date;
  "createdAt": Date;
  "updatedAt": Date;
  "mediaId": number;
  users: User[];
  logoMedia: Media;
  files: MediaLink[];
  courseTests: CourseTest[];
  trainers: User[];
  candidates: CourseCandidate[];
  constructor(data?: CourseInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Course`.
   */
  public static getModelName() {
    return "Course";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Course for dynamic purposes.
  **/
  public static factory(data: CourseInterface): Course{
    return new Course(data);
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
      name: 'Course',
      title:'Szkolenie|Szkolenia',
      plural: 'Courses',
      path: 'Courses',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string',
          title:'Nazwa'
          
          
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
          title:'Data zakńczenia'
          ,
          required: true 
          
        },
        "logoMediaId": {
          name: 'logoMediaId',
          type: 'number',
          title:'Zjęcie'
          
          
        },
        "purpose": {
          name: 'purpose',
          type: 'string',
          title:'Cel szkolenia'
          
          
        },
        "agenda": {
          name: 'agenda',
          type: 'string',
          title:'Program szkolenia'
          
          
        },
        "recipient": {
          name: 'recipient',
          type: 'string',
          title:'Dla kogo'
          
          
        },
        "desc": {
          name: 'desc',
          type: 'string',
          title:'Opis'
          
          
        },
        "free": {
          name: 'free',
          type: 'boolean',
          title:'Bezpłatne'
          
          
        },
        "goelocLat": {
          name: 'goelocLat',
          type: 'number',
          title:'Szerokość geograficzna'
          
          
        },
        "goelocLong": {
          name: 'goelocLong',
          type: 'number',
          title:'Długość geograficzna'
          
          
        },
        "fundingEU": {
          name: 'fundingEU',
          type: 'boolean',
          title:'Finansowanie EU'
          
          
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
        "mediaId": {
          name: 'mediaId',
          type: 'number',
          title:''
          
          
        },
      },
      relations: {
        users: {
          name: 'users',
          type: 'User[]',
          model: 'User',
          relationType: 'hasMany',
          modelThrough: 'UserCourse',
          keyThrough: 'userId',
          keyFrom: 'id',
          keyTo: 'courseId'
        },
        logoMedia: {
          name: 'logoMedia',
          type: 'Media',
          model: 'Media',
          relationType: 'belongsTo',
                  keyFrom: 'logoMediaId',
          keyTo: 'id'
        },
        files: {
          name: 'files',
          type: 'MediaLink[]',
          model: 'MediaLink',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'refId'
        },
        courseTests: {
          name: 'courseTests',
          type: 'CourseTest[]',
          model: 'CourseTest',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'courseId'
        },
        trainers: {
          name: 'trainers',
          type: 'User[]',
          model: 'User',
          relationType: 'hasMany',
          modelThrough: 'TrainerCourse',
          keyThrough: 'userId',
          keyFrom: 'id',
          keyTo: 'courseId'
        },
        candidates: {
          name: 'candidates',
          type: 'CourseCandidate[]',
          model: 'CourseCandidate',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'courseId'
        },
      }
    }
  }
}
