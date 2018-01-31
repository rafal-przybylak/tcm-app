import { NgModule } from '@angular/core';
import { SharedModule } from '../../../modules/shared.module';
import { RouterModule } from '@angular/router';

import { FuseMailConfirmComponent } from './mail-confirm.component';

const routes = [
    {
        path     : '',
        component: FuseMailConfirmComponent
    }
];

@NgModule({
    declarations: [
        FuseMailConfirmComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})

export class MailConfirmModule
{

}
