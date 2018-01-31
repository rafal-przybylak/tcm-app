import {NgModule}                from '@angular/core';
import {RouterModule, Routes}    from '@angular/router';
import {UsersComponent} from "./users/users.component";
import { AuthGuard } from '../../auth-guard.service';

const userRoutes: Routes = [
	{
		path: '',
		component: UsersComponent,
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(userRoutes)
	],
	exports: [
		RouterModule
	]
})
export class UserRoutingModule {

}

