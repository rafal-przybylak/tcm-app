import { NgModule } from '@angular/core';
import { SharedModule } from '../../../modules/shared.module';
import { RouterModule } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { FuseRegister2Component } from './register-2.component';

const routes = [
    {
        path     : '',
        component: FuseRegister2Component
    }
];

@NgModule({
    declarations: [
        FuseRegister2Component
    ],
    imports     : [
        SharedModule,
        RecaptchaModule.forRoot(),
        RecaptchaFormsModule,
        RouterModule.forChild(routes)
    ]
})

export class Register2Module
{

}
