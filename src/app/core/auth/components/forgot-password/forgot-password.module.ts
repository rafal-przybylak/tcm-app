import { NgModule } from '@angular/core';
import { SharedModule } from '../../../modules/shared.module';
import { RouterModule } from '@angular/router';

import { FuseForgotPasswordComponent } from './forgot-password.component';

const routes = [
    {
        path     : '',
        component: FuseForgotPasswordComponent
    }
];

@NgModule({
    declarations: [
        FuseForgotPasswordComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})

export class ForgotPasswordModule
{

}
