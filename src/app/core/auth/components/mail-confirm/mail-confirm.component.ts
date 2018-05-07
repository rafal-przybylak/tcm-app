import { Component, OnInit, OnDestroy } from '@angular/core';

import { FuseConfigService } from '../../../services/config.service';
import { fuseAnimations } from '../../../animations';
import { Router, ActivatedRoute } from '@angular/router';
import { UserApi } from '../../../../../backend/services/custom/User';
import { MatDialog } from '@angular/material';
import { FuseConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { error } from 'util';
import { transformMenu } from '@angular/material/menu/typings/menu-animations';

@Component({
    selector: 'fuse-mail-confirm',
    templateUrl: './mail-confirm.component.html',
    styleUrls: ['./mail-confirm.component.scss'],
    animations: fuseAnimations
})
export class FuseMailConfirmComponent implements OnInit {
    private id: number;
    private sub: any;
    public isError:boolean=false;
    public error: string;
    
    ngOnInit(): void {
        
            this.id = +this.route.snapshot.queryParams['uid'];
            this.userApi.confirm(this.id, this.route.snapshot.queryParams['token']).subscribe(resp => {
                this.router.navigate(["auth-login"]);
            },error=>{
                this.isError=true;
                this.error=error.message;
            });
      


    }

    constructor(private dialog: MatDialog,
        private fuseConfig: FuseConfigService, private router: Router, private userApi: UserApi, private route: ActivatedRoute
    ) {
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar: 'none',
                footer: 'none'
            }
        });
    }
    confirmRequest() {
        this.userApi.verify(this.id).subscribe(()=>{
            let dialRef = this.dialog.open(FuseConfirmDialogComponent);
            dialRef.componentInstance.confirmMessage = "Na podany adres e-mail, został wysłany link do aktywacji konta. Przejdź do swojej skrzynki e-mail i uruchom przesłany link.";
            dialRef.componentInstance.onlyConfirm = true;
        })
    }
}
