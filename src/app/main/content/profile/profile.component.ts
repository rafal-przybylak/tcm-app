import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../core/animations';
import { ProfileService } from './profile.service';
import { LoopBackAuth } from '../../../../backend/index';
import { User } from '../../../../backend/models/User';

@Component({
    selector: 'fuse-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FuseProfileComponent implements OnInit {
    public user: User;
    constructor(private auth: LoopBackAuth) {
        this.user = auth.getCurrentUserData();
        
    }

    ngOnInit() {

    }
}
