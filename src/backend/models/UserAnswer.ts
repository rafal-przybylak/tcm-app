/* tslint:disable */
import {
  User,
  TestQuestion
} from '../index';

declare var Object: any;
export interface UserAnswerInterface {
  "userId": number;
  "questionId": number;
  "value"?: Array<string>;
  "id"?: number;
  "createdAt": Date;
  "updatedAt": Date;
  user?: User;
  question?: TestQuestion;
}

export class UserAnswer implements UserAnswerInterface {
  "userId": number;
  "questionId": number;
  "value": Array<string>;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  user: User;
  question: TestQuestion;
  constructor(data?: UserAnswerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UserAnswer`.
   */
  public static getModelName() {
    return "UserAnswer";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of UserAnswer for dynamic purposes.
  **/
  public static factory(data: UserAnswerInterface): UserAnswer{
    return new UserAnswer(data);
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
      name: 'UserAnswer',
      title:'Odpowiedź|Odpowiedzi',
      plural: 'UserAnswers',
      path: 'UserAnswers',
      idName: 'id',
      properties: {
        "userId": {
          name: 'userId',
          type: 'number',
          title:''
          
        },
        "questionId": {
          name: 'questionId',
          type: 'number',
          title:''
          
        },
        "value": {
          name: 'value',
          type: 'Array<string>',
          title:''
          
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
        question: {
          name: 'question',
          type: 'TestQuestion',
          model: 'TestQuestion',
          relationType: 'belongsTo',
                  keyFrom: 'questionId',
          keyTo: 'id'
        },
      }
    }
  }
}
