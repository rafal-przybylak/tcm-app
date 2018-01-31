import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile.service';
import { fuseAnimations } from '../../../../../core/animations';
import { User } from '../../../../../../backend/models/User';
import { DynamicFormControlModel } from '@ng-dynamic-forms/core';
import { UserData, LoopBackAuth } from '../../../../../../backend/index';
import { ControlGeneratorService } from '../../../../app-form/control-generator.service';
import { FuseConfirmDialogComponent } from '../../../../../core/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { error } from 'selenium-webdriver';
import { NbTokenService } from '../../../../../core/auth/index';

@Component({
    selector: 'fuse-profile-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    animations: fuseAnimations
})
export class FuseProfileAboutComponent implements OnInit {
    //public about: User;
    public objectUserFields: DynamicFormControlModel[];
    public objectUserDataFields: DynamicFormControlModel[];
    public objectUserModel: User = new User();
    public objectUserDataModel: UserData;
    private modelUserDefinition: any =Object.assign({}, User.getModelDefinition());
    private modelUserDataDefinition: any = UserData.getModelDefinition();
    constructor(private nbTokenService:NbTokenService,private loopBackAuth: LoopBackAuth,private dialog:MatDialog, private formService: ControlGeneratorService, private profileService: ProfileService) {
        this.profileService.aboutOnChanged.subscribe(about => {
            this.objectUserModel = about;
            this.objectUserDataModel = about.userData? about.userData:new UserData();
        });
        delete this.modelUserDefinition.properties.passChangeRequired;
        //delete this.modelUserDefinition.properties.username;
       
        delete this.modelUserDefinition.properties.emailVerified;
        this.objectUserFields = formService.getFormControlModel(this.modelUserDefinition);
        this.objectUserDataFields = formService.getFormControlModel(this.modelUserDataDefinition);
    }

    ngOnInit() {

    }
    saveUser(data){
    this.profileService.saveUser(data).subscribe((data)=>{
        let dialRef = this.dialog.open(FuseConfirmDialogComponent);
        dialRef.componentInstance.confirmMessage = "Dane zostały zapisane."
        dialRef.componentInstance.onlyConfirm = true;
        this.loopBackAuth.setUser(data);
        
        this.nbTokenService.resetToken(this.loopBackAuth.getAccessTokenId());
    },error=>{
        let dialRef = this.dialog.open(FuseConfirmDialogComponent);
        dialRef.componentInstance.confirmMessage = "Dane NIE zostały zapisane. Spróbuj ponownie. W przypadku powtórzenia tego komunikatu skontaktuj się z administratorem serwisu."
        dialRef.componentInstance.onlyConfirm = true;
    });
    }
    saveUserData(data){
        this.profileService.saveUserData(data).subscribe(()=>{
            let dialRef = this.dialog.open(FuseConfirmDialogComponent);
            dialRef.componentInstance.confirmMessage = "Dane zostały zapisane."
            dialRef.componentInstance.onlyConfirm = true;
        },error=>{
            let dialRef = this.dialog.open(FuseConfirmDialogComponent);
            dialRef.componentInstance.confirmMessage = "Dane NIE zostały zapisane. Spróbuj ponownie. W przypadku powtórzenia tego komunikatu skontaktuj się z administratorem serwisu."
            dialRef.componentInstance.onlyConfirm = true;
        });
    }
}
