import { Component, OnInit,Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { FuseConfigService } from '../../../services/config.service';
import { fuseAnimations } from '../../../animations';
import { NbAuthResult, NbAuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { getDeepFromObject } from '../../helpers';
import { NB_AUTH_OPTIONS_TOKEN } from '../../auth.options';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { locale as english } from '../i18n/en';
import { locale as polish } from '../i18n/pl';
import { UserApi } from '../../../../../backend/services/custom/User';
import { LoopBackAuth } from '../../../../../backend/index';
@Component({
    selector   : 'fuse-reset-password-2',
    templateUrl: './reset-password-2.component.html',
    styleUrls  : ['./reset-password-2.component.scss'],
    animations : fuseAnimations
})
export class FuseResetPassword2Component implements OnInit
{
    resetPasswordForm: FormGroup;
    resetPasswordFormErrors: any;
    redirectDelay: number = 0;
    showMessages: any = {};
    provider: string = '';
  
    submitted = false;
    errors: string[] = [];
    messages: string[] = [];
    user: any = {};
    hide = true;
    constructor(private translationLoader: FuseTranslationLoaderService,
        @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
        protected service: NbAuthService,
        protected router: Router,
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private userApi: UserApi,
        private authApi: LoopBackAuth

    )
    {
        this.provider = this.getConfigValue('forms.requestPassword.provider');
        this.translationLoader.loadTranslations(english, polish);
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.resetPasswordFormErrors = {
            email          : {},
            password       : {},
            passwordConfirm: {}
        };
    }

    ngOnInit()
    {
        this.resetPasswordForm = this.formBuilder.group({
                password       : ['', Validators.required],
                passwordConfirm: ['', Validators.required]}
                , { validator: this.matchingPasswords } );
        
        

        this.resetPasswordForm.valueChanges.subscribe(() => {
            this.onResetPasswordFormValuesChanged();
        });
    }
    private matchingPasswords( control: AbstractControl ) {
        const password = control.get( 'password' );
        const confirm = control.get( 'passwordConfirm' );
    
        if ( !password || !confirm ) {
          return null;
        }
    
        return password.value === confirm.value ? null : { nomatch: true };
      }
    onResetPasswordFormValuesChanged()
    {
        for ( const field in this.resetPasswordFormErrors )
        {
            if ( this.resetPasswordFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.resetPasswordFormErrors[field] = {};

            // Get the control
            const control = this.resetPasswordForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.resetPasswordFormErrors[field] = control.errors;
            }
        }
    }
    resetPassword(): void {
        this.errors = this.messages = [];
        this.submitted = true;
    
        this.service.resetPassword(this.provider, {password:this.resetPasswordForm.controls["password"].value}).subscribe((result: NbAuthResult) => {
          this.submitted = false;
          if (result.isSuccess()) {
            this.userApi.patchAttributes(this.authApi.getCurrentUserId(),{passChangeRequired:false}).subscribe();
            this.messages = result.getMessages();
            return this.router.navigateByUrl("auth-login");
          } else {
            this.errors = result.getResponse().message;// ["Link aktywacyjny jest przeterminowany. Wyślij jescze raz żądanie zmiany hasła."]
          }
    
        //   const redirect = result.getRedirect();
        //   if (redirect) {
        //       return this.router.navigateByUrl(redirect);
        //   }
        });
      }
      getConfigValue(key: string): any {
        return getDeepFromObject(this.config, key, null);
      }
}
