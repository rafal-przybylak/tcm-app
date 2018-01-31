import { NgModule } from '@angular/core';
import { SharedModule } from '../../../modules/shared.module';
import { RouterModule } from '@angular/router';

import { FuseResetPasswordComponent } from './reset-password.component';

const routes = [
    {
        path     : '',
        component: FuseResetPasswordComponent
    }
];

@NgModule({
    declarations: [
        FuseResetPasswordComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})

export class ResetPasswordModule
{

}
