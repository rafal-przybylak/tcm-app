import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../services/config.service';
import { fuseAnimations } from '../../../animations';
import { NbAuthResult, NbAuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { getDeepFromObject } from '../../helpers';
import { NB_AUTH_OPTIONS_TOKEN } from '../../auth.options';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { locale as english } from '../i18n/en';
import { locale as polish } from '../i18n/pl';
import { LoopBackAuth } from '../../../../../backend/index';
import { User } from '../../../../../backend/models/User';
@Component({
    selector: 'fuse-login-2',
    templateUrl: './login-2.component.html',
    styleUrls: ['./login-2.component.scss'],
    animations: fuseAnimations
})
export class FuseLogin2Component implements OnInit {
    loginForm: FormGroup;
    loginFormErrors: any;
    errors: string[] = [];
    messages: string[] = [];
    user: any = {};
    submitted: boolean = false;
    provider: string = '';
    constructor(private translationLoader: FuseTranslationLoaderService,
        @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
        protected service: NbAuthService,
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        protected router: Router,
        private loopBackAuth: LoopBackAuth
    ) {
        this.translationLoader.loadTranslations(english, polish);
        this.provider = this.getConfigValue('forms.login.provider');
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar: 'none',
                footer: 'none'
            }
        });

        this.loginFormErrors = {
            email: {},
            password: {}
        };
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            captcha:['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }

    onLoginFormValuesChanged() {
        for (const field in this.loginFormErrors) {
            if (!this.loginFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }
    login() {
        this.errors = this.messages = [];
        this.submitted = true;

        this.service.authenticate("email", { email: this.loginForm.controls["email"].value, password: this.loginForm.controls["password"].value }).subscribe((result: NbAuthResult) => {
            this.submitted = false;

            if (result.isSuccess()) {
                this.messages = result.getMessages();
                if((this.loopBackAuth.getCurrentUserData() as User).passChangeRequired){
                 this.router.navigate(["/auth-reset-pass"]);
                }
                else{
                    const redirect = result.getRedirect();
                    return this.router.navigateByUrl(redirect);
                }
                
            } else {
                this.errors = result.getErrors();
            }



        });
    }
    public resolved(captchaResponse: string) {
        this.loginForm.valid;
    }

    getConfigValue(key: string): any {
        return getDeepFromObject(this.config, key, null);
    }
}
