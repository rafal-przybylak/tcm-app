import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { PageComponent}from './page.component';

const routes = [
    {
        path     : '',
        component: PageComponent
    }
];

@NgModule({
    declarations: [
        PageComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        PageComponent
    ]
})

export class PageModule
{
}
