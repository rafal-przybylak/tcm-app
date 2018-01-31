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
import { MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
@Component({
    selector: 'fuse-forgot-password-2',
    templateUrl: './forgot-password-2.component.html',
    styleUrls: ['./forgot-password-2.component.scss'],
    animations: fuseAnimations
})
export class FuseForgotPassword2Component implements OnInit {
    forgotPasswordForm: FormGroup;
    forgotPasswordFormErrors: any;
    redirectDelay: number = 0;
    showMessages: any = {};
    provider: string = '';

    submitted = false;
    errors: string[] = [];
    messages: string[] = [];
    user: any = {};

    constructor(private dialog: MatDialog, private translationLoader: FuseTranslationLoaderService,
        @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
        protected service: NbAuthService,
        protected router: Router,
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder
    ) {
        this.translationLoader.loadTranslations(english, polish);
        this.provider = this.getConfigValue('forms.requestPassword.provider');
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar: 'none',
                footer: 'none'
            }
        });

        this.forgotPasswordFormErrors = {
            email: {}
        };
    }

    ngOnInit() {
        this.forgotPasswordForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });

        this.forgotPasswordForm.valueChanges.subscribe(() => {
            this.onForgotPasswordFormValuesChanged();
        });
    }

    onForgotPasswordFormValuesChanged() {
        for (const field in this.forgotPasswordFormErrors) {
            if (!this.forgotPasswordFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.forgotPasswordFormErrors[field] = {};

            // Get the control
            const control = this.forgotPasswordForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.forgotPasswordFormErrors[field] = control.errors;
            }
        }
    }
    requestPassword() {
        this.errors = this.messages = [];
        this.submitted = true;

        this.service.requestPassword(this.provider, { email: this.forgotPasswordForm.controls["email"].value }).subscribe((result: NbAuthResult) => {
            this.submitted = false;
            if (result.isSuccess()) {
                this.messages = result.getMessages();
                let dialRef = this.dialog.open(FuseConfirmDialogComponent);
                dialRef.componentInstance.confirmMessage = "Na podany adres e-mail, został wyslany link do zmiany hasła. Przejdź do swojej skrzynki e-mail i uruchom go."
                dialRef.componentInstance.onlyConfirm = true;
                dialRef.afterClosed().subscribe(() => {
                    this.router.navigate(["/auth-login"]);
                });
            } else {
                this.errors = ["Podany adres email nie istniej w systemie."];
            }
           
        });
    }
    getConfigValue(key: string): any {
        return getDeepFromObject(this.config, key, null);
    }
}
