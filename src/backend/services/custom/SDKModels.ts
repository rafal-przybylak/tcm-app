/* tslint:disable */
import { Injectable } from '@angular/core';
import { Email } from '../../models/Email';
import { User } from '../../models/User';
import { RoleMapping } from '../../models/RoleMapping';
import { Role } from '../../models/Role';
import { Course } from '../../models/Course';
import { UserCourse } from '../../models/UserCourse';
import { UserData } from '../../models/UserData';
import { Test } from '../../models/Test';
import { TestQuestion } from '../../models/TestQuestion';
import { UserAnswer } from '../../models/UserAnswer';
import { Media } from '../../models/Media';
import { MediaLink } from '../../models/MediaLink';
import { Storage } from '../../models/Storage';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Email: Email,
    User: User,
    RoleMapping: RoleMapping,
    Role: Role,
    Course: Course,
    UserCourse: UserCourse,
    UserData: UserData,
    Test: Test,
    TestQuestion: TestQuestion,
    UserAnswer: UserAnswer,
    Media: Media,
    MediaLink: MediaLink,
    Storage: Storage,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
