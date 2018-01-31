import { NgModule } from '@angular/core';
import { SharedModule } from '../../../modules/shared.module';
import { RouterModule } from '@angular/router';

import { FuseResetPassword2Component } from './reset-password-2.component';

const routes = [
    {
        path     : '',
        component: FuseResetPassword2Component
    }
];

@NgModule({
    declarations: [
        FuseResetPassword2Component
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})

export class ResetPassword2Module
{

}
