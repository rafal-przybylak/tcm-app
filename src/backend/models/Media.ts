/* tslint:disable */
import {
  User,
  Course
} from '../index';

declare var Object: any;
export interface MediaInterface {
  "name"?: string;
  "type"?: string;
  "container"?: string;
  "size"?: number;
  "userId"?: number;
  "id"?: number;
  "deletedAt"?: Date;
  "createdAt": Date;
  "updatedAt": Date;
  user?: User;
  courses?: Course[];
}

export class Media implements MediaInterface {
  "name": string;
  "type": string;
  "container": string;
  "size": number;
  "userId": number;
  "id": number;
  "deletedAt": Date;
  "createdAt": Date;
  "updatedAt": Date;
  user: User;
  courses: Course[];
  constructor(data?: MediaInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Media`.
   */
  public static getModelName() {
    return "Media";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Media for dynamic purposes.
  **/
  public static factory(data: MediaInterface): Media{
    return new Media(data);
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
      name: 'Media',
      title:'Załącznik|Załączniki',
      plural: 'Media',
      path: 'Media',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string',
          title:'Nazwa'
          
          
        },
        "type": {
          name: 'type',
          type: 'string',
          title:'Typ'
          
          
        },
        "container": {
          name: 'container',
          type: 'string',
          title:'Katalog'
          
          
        },
        "size": {
          name: 'size',
          type: 'number',
          title:'Rozmiar'
          
          
        },
        "userId": {
          name: 'userId',
          type: 'number',
          title:'Właściciel'
          
          
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
        user: {
          name: 'user',
          type: 'User',
          model: 'User',
          relationType: 'belongsTo',
                  keyFrom: 'userId',
          keyTo: 'id'
        },
        courses: {
          name: 'courses',
          type: 'Course[]',
          model: 'Course',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'mediaId'
        },
      }
    }
  }
}
