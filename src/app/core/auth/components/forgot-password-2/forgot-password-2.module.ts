import { NgModule } from '@angular/core';
import { SharedModule } from '../../../modules/shared.module';
import { RouterModule } from '@angular/router';

import { FuseForgotPassword2Component } from './forgot-password-2.component';

const routes = [
    {
        path     : '',
        component: FuseForgotPassword2Component
    }
];

@NgModule({
    declarations: [
        FuseForgotPassword2Component
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})

export class ForgotPassword2Module
{
}
