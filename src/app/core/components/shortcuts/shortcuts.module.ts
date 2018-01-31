import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseShortcutsComponent } from './shortcuts.component';
import { SharedModule } from '../../modules/shared.module';
import { RolesElementDirective } from '../../directives/roles-element.directive';

@NgModule({
    declarations: [
        FuseShortcutsComponent
    ],
    imports     : [
        SharedModule,
        RouterModule
    ],
    exports     : [
        FuseShortcutsComponent
    ]
})
export class FuseShortcutsModule
{
}
