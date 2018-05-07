import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { FuseConfigService } from '../../../services/config.service';
import { fuseAnimations } from '../../../animations';
import { NbAuthResult, NbAuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { getDeepFromObject } from '../../helpers';
//import { NB_AUTH_OPTIONS_TOKEN } from '../../auth.options';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { locale as english } from '../i18n/en';
import { locale as polish } from '../i18n/pl';
import { MatDialog } from '@angular/material';
import { UseTermsComponent } from '../../../components/use-terms/use-terms.component';
import { FuseConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
@Component({
    selector: 'fuse-register-2',
    templateUrl: './register-2.component.html',
    styleUrls: ['./register-2.component.scss'],
    animations: fuseAnimations
})
export class FuseRegister2Component implements OnInit {
    registerForm: FormGroup;
    registerFormErrors: any;
    errors: string[] = [];
    messages: string[] = [];
    user: any = {};
    hide = true;
    public termsAccepted=false;
    
    constructor(
        public dialog: MatDialog,
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        //@Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
        protected service: NbAuthService,
        protected router: Router
    ) {
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar: 'none',
                footer: 'none'
            }
        });

        this.registerFormErrors = {
            firstName: {},
            lastName: {},
            email: {},
            password: {},
            passwordConfirm: {}
        };
    }

    ngOnInit() {
      
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required],
            captcha:['', Validators.required],
            termsAccepted:[{disabled:true},{ validator: this.termsAccept }]
        }, { validator: this.matchingPasswords }
        );
       
        this.registerForm.controls["termsAccepted"].disable();
        this.registerForm.valueChanges.subscribe(() => {
            this.onRegisterFormValuesChanged();
        });
    }
    private matchingPasswords(control: AbstractControl) {
        const check = control.get('termsAccepted');
        return check.value? null : { noCheck: true };
    } 
    private termsAccept(control: AbstractControl) {
        const password = control.get('password');
        const confirm = control.get('passwordConfirm');

        if (!password || !confirm) {
            return null;
        }

        return password.value === confirm.value ? null : { nomatch: true };
    }
    onRegisterFormValuesChanged() {
        for (const field in this.registerFormErrors) {
            if (!this.registerFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.registerFormErrors[field] = {};

            // Get the control
            const control = this.registerForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.registerFormErrors[field] = control.errors;
            }
        }
    }
    register() {
       
        this.errors = this.messages = [];
        //this.submitted = true;

        this.service.register("email", { username: this.registerForm.controls["firstName"].value +" "+this.registerForm.controls["lastName"].value,
        firstName: this.registerForm.controls["firstName"].value,
        lastName:this.registerForm.controls["lastName"].value,
         email: this.registerForm.controls["email"].value, 
         password: this.registerForm.controls["password"].value }).subscribe((result: NbAuthResult) => {
            //this.submitted = false;

            if (result.isSuccess()) {
                
                this.messages = result.getMessages();
                const redirect = result.getRedirect();
                let dialRef = this.dialog.open(FuseConfirmDialogComponent);
                dialRef.componentInstance.confirmMessage = "Na podany adres e-mail, został wysłany link do aktywacji konta. Przejdź do swojej skrzynki e-mail i uruchom przesłany link.";
                dialRef.componentInstance.onlyConfirm = true;
                dialRef.afterClosed().subscribe(()=>this.router.navigateByUrl("/courses"));
                
            } 
            else {
                this.errors = result.getResponse().message; //["Podany adres email istnieje już w systemie"];
            }



        });
    }
    useTerms(){
        this.registerForm.controls["termsAccepted"].enable();
        let dialogRef = this.dialog.open(UseTermsComponent, { width: '900px',height:'800px' });

    }
}
