import { NgModule } from '@angular/core';
import { SharedModule } from '../../../modules/shared.module';
import { RouterModule } from '@angular/router';

import { FuseRegisterComponent } from './register.component';

const routes = [
    {
        path     : '',
        component: FuseRegisterComponent
    }
];

@NgModule({
    declarations: [
        FuseRegisterComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})

export class RegisterModule
{

}
