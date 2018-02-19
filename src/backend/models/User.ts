/* tslint:disable */
import {
  Role,
  Course,
  UserData,
  UserAnswer,
  Media,
  MediaLink,
  UserCourseTest,
  CourseScope,
  CourseCandidate
} from '../index';

declare var Object: any;
export interface UserInterface {
  "firstName"?: string;
  "lastName"?: string;
  "passChangeRequired"?: boolean;
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: number;
  "password"?: string;
  accessTokens?: any[];
  roles?: Role[];
  courses?: Course[];
  userData?: UserData;
  evaluatedUserAnswers?: UserAnswer[];
  media?: Media[];
  avatar?: MediaLink;
  userCourseTests?: UserCourseTest[];
  trainingCourses?: Course[];
  courseScopes?: CourseScope[];
  courseApplications?: CourseCandidate[];
}

export class User implements UserInterface {
  "firstName": string;
  "lastName": string;
  "passChangeRequired": boolean;
  "realm": string;
  "username": string;
  "email": string;
  "emailVerified": boolean;
  "id": number;
  "password": string;
  accessTokens: any[];
  roles: Role[];
  courses: Course[];
  userData: UserData;
  evaluatedUserAnswers: UserAnswer[];
  media: Media[];
  avatar: MediaLink;
  userCourseTests: UserCourseTest[];
  trainingCourses: Course[];
  courseScopes: CourseScope[];
  courseApplications: CourseCandidate[];
  constructor(data?: UserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `User`.
   */
  public static getModelName() {
    return "User";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of User for dynamic purposes.
  **/
  public static factory(data: UserInterface): User{
    return new User(data);
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
      name: 'User',
      title:'Użytkownik|Użytkownicy',
      plural: 'users',
      path: 'users',
      idName: 'id',
      properties: {
        "firstName": {
          name: 'firstName',
          type: 'string',
          title:'Imię'
          
          
        },
        "lastName": {
          name: 'lastName',
          type: 'string',
          title:'Nazwisko'
          
          
        },
        "passChangeRequired": {
          name: 'passChangeRequired',
          type: 'boolean',
          title:'Wymagna zmiana hasła'
          
          
        },
        "realm": {
          name: 'realm',
          type: 'string',
          title:''
          
          
        },
        "username": {
          name: 'username',
          type: 'string',
          title:''
          
          
        },
        "email": {
          name: 'email',
          type: 'string',
          title:''
          ,
          required: true 
          
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean',
          title:''
          
          
        },
        "id": {
          name: 'id',
          type: 'number',
          title:''
          
          
        },
        "password": {
          name: 'password',
          type: 'string',
          title:''
          
          
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        roles: {
          name: 'roles',
          type: 'Role[]',
          model: 'Role',
          relationType: 'hasMany',
          modelThrough: 'RoleMapping',
          keyThrough: 'roleId',
          keyFrom: 'id',
          keyTo: 'principalId'
        },
        courses: {
          name: 'courses',
          type: 'Course[]',
          model: 'Course',
          relationType: 'hasMany',
          modelThrough: 'UserCourse',
          keyThrough: 'courseId',
          keyFrom: 'id',
          keyTo: 'userId'
        },
        userData: {
          name: 'userData',
          type: 'UserData',
          model: 'UserData',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        evaluatedUserAnswers: {
          name: 'evaluatedUserAnswers',
          type: 'UserAnswer[]',
          model: 'UserAnswer',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'trainerId'
        },
        media: {
          name: 'media',
          type: 'Media[]',
          model: 'Media',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        avatar: {
          name: 'avatar',
          type: 'MediaLink',
          model: 'MediaLink',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'refId'
        },
        userCourseTests: {
          name: 'userCourseTests',
          type: 'UserCourseTest[]',
          model: 'UserCourseTest',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        trainingCourses: {
          name: 'trainingCourses',
          type: 'Course[]',
          model: 'Course',
          relationType: 'hasMany',
          modelThrough: 'TrainerCourse',
          keyThrough: 'courseId',
          keyFrom: 'id',
          keyTo: 'userId'
        },
        courseScopes: {
          name: 'courseScopes',
          type: 'CourseScope[]',
          model: 'CourseScope',
          relationType: 'hasMany',
          modelThrough: 'TrainerCourseScope',
          keyThrough: 'courseScopeId',
          keyFrom: 'id',
          keyTo: 'trainerId'
        },
        courseApplications: {
          name: 'courseApplications',
          type: 'CourseCandidate[]',
          model: 'CourseCandidate',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
      }
    }
  }
}
