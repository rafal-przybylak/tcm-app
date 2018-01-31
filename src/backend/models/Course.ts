/* tslint:disable */
import {
  User,
  Test,
  MediaLink
} from '../index';

declare var Object: any;
export interface CourseInterface {
  "name"?: string;
  "startDt": Date;
  "endDt": Date;
  "desc"?: string;
  "free"?: boolean;
  "goelocLat"?: number;
  "goelocLong"?: number;
  "id"?: number;
  "createdAt": Date;
  "updatedAt": Date;
  users?: User[];
  tests?: Test[];
  files?: MediaLink[];
}

export class Course implements CourseInterface {
  "name": string;
  "startDt": Date;
  "endDt": Date;
  "desc": string;
  "free": boolean;
  "goelocLat": number;
  "goelocLong": number;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  users: User[];
  tests: Test[];
  files: MediaLink[];
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
          
        },
        "endDt": {
          name: 'endDt',
          type: 'Date',
          title:'Data zakńczenia'
          
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
        tests: {
          name: 'tests',
          type: 'Test[]',
          model: 'Test',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'courseId'
        },
        files: {
          name: 'files',
          type: 'MediaLink[]',
          model: 'MediaLink',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'refId'
        },
      }
    }
  }
}
