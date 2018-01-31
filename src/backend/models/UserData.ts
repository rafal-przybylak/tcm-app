/* tslint:disable */
import {
  User
} from '../index';

declare var Object: any;
export interface UserDataInterface {
  "userId": number;
  "tin"?: string;
  "education"?: string;
  "state"?: string;
  "country"?: string;
  "community"?: string;
  "city"?: string;
  "postalCode"?: string;
  "street"?: string;
  "streetNumber"?: string;
  "localNumber"?: string;
  "phone"?: string;
  "email"?: string;
  "jobPosition"?: string;
  "employer"?: string;
  "employerSity"?: string;
  "employerPostalCode"?: string;
  "employerStreet"?: string;
  "employerStreetNumber"?: string;
  "employerLocalNumber"?: string;
  "workPhone"?: string;
  "id"?: number;
  "createdAt": Date;
  "updatedAt": Date;
  user?: User;
}

export class UserData implements UserDataInterface {
  "userId": number;
  "tin": string;
  "education": string;
  "state": string;
  "country": string;
  "community": string;
  "city": string;
  "postalCode": string;
  "street": string;
  "streetNumber": string;
  "localNumber": string;
  "phone": string;
  "email": string;
  "jobPosition": string;
  "employer": string;
  "employerSity": string;
  "employerPostalCode": string;
  "employerStreet": string;
  "employerStreetNumber": string;
  "employerLocalNumber": string;
  "workPhone": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  user: User;
  constructor(data?: UserDataInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UserData`.
   */
  public static getModelName() {
    return "UserData";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of UserData for dynamic purposes.
  **/
  public static factory(data: UserDataInterface): UserData{
    return new UserData(data);
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
      name: 'UserData',
      title:'Dane użytkownika|Dane użytkownika',
      plural: 'UserData',
      path: 'UserData',
      idName: 'id',
      properties: {
        "userId": {
          name: 'userId',
          type: 'number',
          title:''
          
        },
        "tin": {
          name: 'tin',
          type: 'string',
          title:'Pesel'
          
        },
        "education": {
          name: 'education',
          type: 'string',
          title:'Wykształcenie'
          
        },
        "state": {
          name: 'state',
          type: 'string',
          title:'Województwo'
          
        },
        "country": {
          name: 'country',
          type: 'string',
          title:'Kraj'
          
        },
        "community": {
          name: 'community',
          type: 'string',
          title:'Powiat'
          
        },
        "city": {
          name: 'city',
          type: 'string',
          title:'Miasto'
          
        },
        "postalCode": {
          name: 'postalCode',
          type: 'string',
          title:'Kod pocztowy'
          
        },
        "street": {
          name: 'street',
          type: 'string',
          title:'Ulica'
          
        },
        "streetNumber": {
          name: 'streetNumber',
          type: 'string',
          title:'Numer'
          
        },
        "localNumber": {
          name: 'localNumber',
          type: 'string',
          title:'Numer lokalu'
          
        },
        "phone": {
          name: 'phone',
          type: 'string',
          title:'Nr. telefonu'
          
        },
        "email": {
          name: 'email',
          type: 'string',
          title:'Email'
          
        },
        "jobPosition": {
          name: 'jobPosition',
          type: 'string',
          title:'Stanowisko'
          
        },
        "employer": {
          name: 'employer',
          type: 'string',
          title:'Pracodawca'
          
        },
        "employerSity": {
          name: 'employerSity',
          type: 'string',
          title:'Miasto pracodawcy'
          
        },
        "employerPostalCode": {
          name: 'employerPostalCode',
          type: 'string',
          title:'Kod pocztowy pracodawczy'
          
        },
        "employerStreet": {
          name: 'employerStreet',
          type: 'string',
          title:'Ulica pracodawcy'
          
        },
        "employerStreetNumber": {
          name: 'employerStreetNumber',
          type: 'string',
          title:'Numer ulicy pracodawcy'
          
        },
        "employerLocalNumber": {
          name: 'employerLocalNumber',
          type: 'string',
          title:'Numer lokalu pracodawcy'
          
        },
        "workPhone": {
          name: 'workPhone',
          type: 'string',
          title:'Telefon slużbowy'
          
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
