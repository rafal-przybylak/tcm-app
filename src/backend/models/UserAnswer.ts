/* tslint:disable */
import {
  User,
  TestQuestion,
  UserCourseTest
} from '../index';

declare var Object: any;
export interface UserAnswerInterface {
  "userCourseTestId": number;
  "questionId": number;
  "questContent"?: string;
  "value"?: Array<string>;
  "answerDt"?: Date;
  "evaluationDt"?: Date;
  "trainerId"?: number;
  "score"?: number;
  "id"?: number;
  "deletedAt"?: Date;
  "createdAt": Date;
  "updatedAt": Date;
  trainer?: User;
  question?: TestQuestion;
  userCourseTest?: UserCourseTest;
}

export class UserAnswer implements UserAnswerInterface {
  "userCourseTestId": number;
  "questionId": number;
  "questContent": string;
  "value": Array<string>;
  "answerDt": Date;
  "evaluationDt": Date;
  "trainerId": number;
  "score": number;
  "id": number;
  "deletedAt": Date;
  "createdAt": Date;
  "updatedAt": Date;
  trainer: User;
  question: TestQuestion;
  userCourseTest: UserCourseTest;
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
        "userCourseTestId": {
          name: 'userCourseTestId',
          type: 'number',
          title:'Test uczestnika'
          ,
          required: true 
          
        },
        "questionId": {
          name: 'questionId',
          type: 'number',
          title:'Pytanie'
          ,
          required: true 
          
        },
        "questContent": {
          name: 'questContent',
          type: 'string',
          title:'Treść pytania'
          
          
        },
        "value": {
          name: 'value',
          type: 'Array<string>',
          title:'Odpowiedź'
          
          
        },
        "answerDt": {
          name: 'answerDt',
          type: 'Date',
          title:'Data oceny'
          
          
        },
        "evaluationDt": {
          name: 'evaluationDt',
          type: 'Date',
          title:'Data oceny'
          
          
        },
        "trainerId": {
          name: 'trainerId',
          type: 'number',
          title:'Trener oceniający'
          
          
        },
        "score": {
          name: 'score',
          type: 'number',
          title:'Uzyskana ilość punków'
          
          
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
        trainer: {
          name: 'trainer',
          type: 'User',
          model: 'User',
          relationType: 'belongsTo',
                  keyFrom: 'trainerId',
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
        userCourseTest: {
          name: 'userCourseTest',
          type: 'UserCourseTest',
          model: 'UserCourseTest',
          relationType: 'belongsTo',
                  keyFrom: 'userCourseTestId',
          keyTo: 'id'
        },
      }
    }
  }
}
