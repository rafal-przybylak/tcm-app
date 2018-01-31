/* tslint:disable */
import {
  Media
} from '../index';

declare var Object: any;
export interface MediaLinkInterface {
  "id"?: number;
  "mediaId"?: number;
  "refId"?: number;
  "refType"?: string;
  "createdAt": Date;
  "updatedAt": Date;
  media?: Media;
  avatar?: any;
  node?: any;
}

export class MediaLink implements MediaLinkInterface {
  "id": number;
  "mediaId": number;
  "refId": number;
  "refType": string;
  "createdAt": Date;
  "updatedAt": Date;
  media: Media;
  avatar: any;
  node: any;
  constructor(data?: MediaLinkInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `MediaLink`.
   */
  public static getModelName() {
    return "MediaLink";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of MediaLink for dynamic purposes.
  **/
  public static factory(data: MediaLinkInterface): MediaLink{
    return new MediaLink(data);
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
      name: 'MediaLink',
      title:'Załącznik|Załączniki',
      plural: 'MediaLinks',
      path: 'MediaLinks',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number',
          title:''
          
        },
        "mediaId": {
          name: 'mediaId',
          type: 'number',
          title:''
          
        },
        "refId": {
          name: 'refId',
          type: 'number',
          title:''
          
        },
        "refType": {
          name: 'refType',
          type: 'string',
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
        media: {
          name: 'media',
          type: 'Media',
          model: 'Media',
          relationType: 'belongsTo',
                  keyFrom: 'mediaId',
          keyTo: 'id'
        },
        avatar: {
          name: 'avatar',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'refId',
          keyTo: 'id'
        },
        node: {
          name: 'node',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'refId',
          keyTo: 'id'
        },
      }
    }
  }
}
