import { NgModule } from '@angular/core';
import { SharedModule } from '../../../modules/shared.module';
import { RouterModule } from '@angular/router';

import { FuseLockComponent } from './lock.component';

const routes = [
    {
        path     : '',
        component: FuseLockComponent
    }
];

@NgModule({
    declarations: [
        FuseLockComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})

export class LockModule
{

}
