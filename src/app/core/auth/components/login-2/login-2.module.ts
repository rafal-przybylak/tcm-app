import { NgModule } from '@angular/core';
import { SharedModule } from '../../../modules/shared.module';
import { RouterModule } from '@angular/router';

import { FuseLogin2Component } from './login-2.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
const routes = [
    {
        path     : '',
        component: FuseLogin2Component
    }
];

@NgModule({
    declarations: [
        FuseLogin2Component
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        RecaptchaModule.forRoot(),
        RecaptchaFormsModule,
    ]
})

export class Login2Module
{

}
