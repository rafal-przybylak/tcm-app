import {Component, OnInit} from '@angular/core';
//import {AppService} from "../../../../backend/services/app";
import {User} from "../../../../backend/models/User";
import {UserApi} from "../../../../backend/services/custom/User";
import {MatDialogRef} from "@angular/material";
import {Role} from "../../../../backend/models/Role";
import {RoleMapping} from "../../../../backend/models/RoleMapping";
import {Subject} from "rxjs";
import { RoleMappingInterface } from '../../../../backend/index';

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

  public selectedModel: any;


  constructor(//private app: AppService,
              public dialog: MatDialogRef<UserFormComponent>,
              private userService: UserApi) {

  }

  ngOnInit() {

    if (this.selectedModel) {
      this.model = this.selectedModel;
      this.title = "Edycja użytkownika";
      this.action = "Aktualizuj";
      this.passwordRequired = false;
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

      });

    } else {
      this.userService.create(this.model).subscribe((user) => {
        this.dialog.close(user);
        this.selectedModel = null;
      }, err => {
        this.errorMessage = err.message;
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
        this.userService.linkRoles(this.model.id, role.id, data).subscribe(res => {
          //console.log("role mapping created", res);
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
