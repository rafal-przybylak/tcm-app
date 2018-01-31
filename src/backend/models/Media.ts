/* tslint:disable */
import {
  User
} from '../index';

declare var Object: any;
export interface MediaInterface {
  "name"?: string;
  "type"?: string;
  "container"?: string;
  "size"?: number;
  "id"?: number;
  "userId"?: number;
  "createdAt": Date;
  "updatedAt": Date;
  user?: User;
}

export class Media implements MediaInterface {
  "name": string;
  "type": string;
  "container": string;
  "size": number;
  "id": number;
  "userId": number;
  "createdAt": Date;
  "updatedAt": Date;
  user: User;
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
          title:''
          
        },
        "type": {
          name: 'type',
          type: 'string',
          title:''
          
        },
        "container": {
          name: 'container',
          type: 'string',
          title:''
          
        },
        "size": {
          name: 'size',
          type: 'number',
          title:''
          
        },
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
      }
    }
  }
}
