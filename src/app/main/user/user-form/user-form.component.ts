import { Component, OnInit } from '@angular/core';
//import {AppService} from "../../../../backend/services/app";
import { User } from "../../../../backend/models/User";
import { UserApi } from "../../../../backend/services/custom/User";
import { MatDialogRef } from "@angular/material";
import { Role } from "../../../../backend/models/Role";
import { RoleMapping } from "../../../../backend/models/RoleMapping";
import { Subject, Observer } from "rxjs";
import { RoleMappingInterface, RoleMappingApi, Course, CourseScope, TrainerCourseScope, CourseScopeApi } from '../../../../backend/index';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  model: User = new User();
  errorMessage: string;
  title: string = "Dadawanie użytkowanika";
  action: string = "Dodaj";
  passwordRequired: boolean = true;
  roles: Role[] = [];
  rolesAdd: Role[] = [];
  rolesRemove: Role[] = [];
  trainerScopes: number[];
  baseTrainerScopes: number[];
  public selectedModel: any;
  public coursScoules$: Observable<CourseScope[]>;

  constructor(//private app: AppService,
    public dialog: MatDialogRef<UserFormComponent>,
    private userService: UserApi,
    private roleMapApi: RoleMappingApi, private scoupeApi: CourseScopeApi) {
    this.coursScoules$ = scoupeApi.find<CourseScope>();
  }

  ngOnInit() {

    if (this.selectedModel) {
      this.model = this.selectedModel;
      this.title = "Edycja użytkownika";
      this.action = "Aktualizuj";
      this.passwordRequired = false;
      this.userService.getCourseScopes(this.model.id).subscribe(data => {
        this.trainerScopes = data.map(x => x.id);
        this.baseTrainerScopes=[...this.trainerScopes];
      });
    }


  }

  isExistById(items: any[], item: any): boolean {

    if (items && items.length) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].id == item.id) {
          return true;
        }
      }
    }
    return false;
  }

  findIndexByName(items: any[], item: any): number {

    for (let i = 0; i < items.length; i++) {
      if (item.name == items[i].name) {
        return i;
      }
    }

    return null;
  }

  findIndexById(items: any[], item: any): number {

    for (let i = 0; i < items.length; i++) {
      if (item.id == items[i].id) {
        return i;
      }
    }

    return null;
  }

  onSave() {

    this.action = "Zapisywanie...";
    if (this.model.id) {
      this.userService.patchAttributes(this.model.id, this.model).subscribe((response: any) => {
        this.selectedModel = null;
        this.model = response;
        this.saveUserRoles();
        this.updateTrainerScoupe();
      });

    } else {
      this.userService.create(this.model).subscribe((user) => {
        this.dialog.close(user);
        this.selectedModel = null;
        this.model=user;
        this.addUserRoles();
        this.createTrainerScoupe();
      }, err => {
        this.errorMessage = err.message;
      });


    }


  }
  addUserRoles() {
    if (this.rolesAdd && this.rolesAdd.length) {
      this.rolesAdd.forEach((role) => {
        

        let data: RoleMappingInterface = {
          principalType: "USER",
          principalId: this.model.id.toString(),
          roleId: role.id
        };
        this.roleMapApi.create(data).subscribe(res => {
          console.log("role mapping created", res);
        })
      });

    }
  }
  saveUserRoles() {


    if (this.rolesAdd && this.rolesAdd.length) {
      this.rolesAdd.forEach((role) => {
        this.model.roles.push(role);

        let data: RoleMappingInterface = {
          principalType: "USER",
          principalId: this.model.id.toString(),
          roleId: role.id
        };
        this.roleMapApi.create(data).subscribe(res => {
          console.log("role mapping created", res);
        })
      });

    }

    if (this.rolesRemove && this.rolesRemove.length) {
      this.rolesRemove.forEach((role) => {
        this.model.roles = this.model.roles.filter(r => r.id !== role.id);

        this.userService.unlinkRoles(this.model.id, role.id).subscribe(res => {
          // console.log("role mapping delete", res);
        })
      });

    }

    this.dialog.close(this.model);

   

  }
  updateTrainerScoupe(){
    let tasks$ = [];
    

    this.baseTrainerScopes.forEach(element => {
       tasks$.push(this.userService.unlinkCourseScopes(this.model.id,element));
    });
    if(tasks$.length>0){
      forkJoin(...tasks$).subscribe(results => {
        this.trainerScopes.forEach(element => {
          this.userService.linkCourseScopes(this.model.id,element).subscribe();  
        });
        
      });
    }else{
      this.trainerScopes.forEach(element => {
        this.userService.linkCourseScopes(this.model.id,element).subscribe();  
      });
    }
   
  }
  createTrainerScoupe(){
    let tasks$ = [];
    this.trainerScopes.forEach(element => {
       tasks$.push(this.userService.linkCourseScopes(this.model.id,element));
    });
    forkJoin(...tasks$).subscribe();
  }
  updateRoles(role, event) {

    if (event.checked == true) {
      let indexValue = this.findIndexById(this.rolesAdd, role);
      this.rolesRemove = this.rolesRemove.filter(r => r.id !== role.id);
      if (indexValue == null) {
        this.rolesAdd.push(role);
      }
    } else {
      this.rolesAdd = this.rolesAdd.filter(r => r.id !== role.id);
      let idv1 = this.findIndexById(this.model.roles, role);
      let idv2 = this.findIndexById(this.rolesRemove, role);
      if (idv1 !== null && idv2 == null) {
        // found item in existing role remove and we need keep it to remove query
        this.rolesRemove.push(role);
      }
    }

  }

}
