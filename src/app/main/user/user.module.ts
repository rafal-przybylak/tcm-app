import {NgModule} from '@angular/core';
import {UsersComponent} from './users/users.component';
import {UserFormComponent} from './user-form/user-form.component';
import {UserRoutingModule} from "./user.routing";
import { SharedModule } from '../../core/modules/shared.module';

@NgModule({
	imports: [
		SharedModule,
		UserRoutingModule
	],
	declarations: [UsersComponent, UserFormComponent],
	entryComponents: [UserFormComponent]
})
export class AppUserModule {
}
