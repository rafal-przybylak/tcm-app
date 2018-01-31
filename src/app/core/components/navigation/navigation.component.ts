import { Component, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FuseNavigationService } from './navigation.service';
import { Subscription } from 'rxjs/Subscription';
import { NbAuthService } from '../../auth/index';
import { Subscriber } from 'rxjs/Subscriber';
import { CoreConfig } from '../../api.config';

@Component({
    selector: 'fuse-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseNavigationComponent implements OnDestroy {
    navigationModel: any[];
    navigationModelChangeSubscription: Subscription;

    @Input('layout') layout = 'vertical';

    constructor(private fuseNavigationService: FuseNavigationService, private auth: NbAuthService) {
        this.navigationModelChangeSubscription =
            this.fuseNavigationService.onNavigationModelChange
                .subscribe((navigationModel) => {
                    this.navigationModel = navigationModel;
                });
    }

    ngOnDestroy() {
        this.navigationModelChangeSubscription.unsubscribe();
    }
    hasRights(role: string): boolean {
        let isInRole = false;
        if(role==undefined || role==CoreConfig.everyoneRole){
            isInRole=true;
        }else if(role==CoreConfig.authenticatedRole){
            this.auth.isAuthenticated().subscribe(auth=>{
                isInRole=auth;
            })
        }else{
            this.auth._userRoles.subscribe(userRoles => {
                isInRole = userRoles.includes(role);
            });
            
        }
        return isInRole;
    }

}
