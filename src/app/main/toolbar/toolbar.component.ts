import { Component, Inject } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { FuseConfigService } from '../../core/services/config.service';
import { TranslateService } from '@ngx-translate/core';
import { NbAuthResult, NbAuthService } from '../../core/auth/services/auth.service';
import { getDeepFromObject } from '../../core/auth/helpers';
import { NB_AUTH_OPTIONS_TOKEN } from '../../core/auth/auth.options';
import { LoopBackAuth } from '../../../backend/index';
import { DialogService } from '../../core/services/dialog.service';
//import { AuthElementDirective } from '../../core/directives/auth-element.directive';

@Component({
    selector: 'fuse-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})

export class FuseToolbarComponent {
    userStatusOptions: any[];
    languages: any;
    selectedLanguage: any;
    showLoadingBar: boolean;
    horizontalNav: boolean;
    provider: string = '';
    isAuth: boolean = false;
    public userName: string;
    flexSupport: boolean;
    constructor( private dioalogServ:DialogService,
        @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
        protected service: NbAuthService,
        private router: Router,
        private fuseConfig: FuseConfigService,
        private translate: TranslateService,
        private loopBackAuth: LoopBackAuth
    ) {
        this.flexSupport= document.createElement('p').style.flex=="";
        this.service.isAuthenticated().subscribe(auth => {
            this.isAuth = auth;
            if(auth)
            {
                this.userName=this.loopBackAuth.getCurrentUserData().firstName?this.loopBackAuth.getCurrentUserData().firstName+ ' ' +this.loopBackAuth.getCurrentUserData().lastName:this.loopBackAuth.getCurrentUserData().userName;
                console.log(this.userName);
            }
        });
        this.service
        this.provider = this.getConfigValue('forms.requestPassword.provider');
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon': 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon': 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon': 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.languages = [
            {
                'id': 'pl',
                'title': 'Polski',
                'flag': 'pl'
            },
            {
                'id': 'en',
                'title': 'English',
                'flag': 'us'
            }

        ];

        this.selectedLanguage = this.languages[0];

        router.events.subscribe(
            (event) => {
                if (event instanceof NavigationStart) {
                    this.showLoadingBar = true;
                }
                if (event instanceof NavigationEnd) {
                    this.showLoadingBar = false;
                }
            });

        this.fuseConfig.onSettingsChanged.subscribe((settings) => {
            this.horizontalNav = settings.layout.navigation === 'top';
        });

    }

    search(value) {
        // Do your search here...
        console.log(value);
    }

    setLanguage(lang) {
        // Set the selected language for toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this.translate.use(lang.id);
    }
    logout() {

        //this.router.navigate(['/auth-login']);
        this.service.logout(this.provider).subscribe((result: NbAuthResult) => {

            const redirect = result.getRedirect() != "/" ? result.getRedirect() : "auth-login";
            if (!result.isSuccess) {

                // this.router.navigate([ this.router.url]);

            }
            this.router.navigate(['/auth-login']);
        });
    }
    login() {
        this.router.navigate(['/auth-login']);

    }
    getConfigValue(key: string): any {
        return getDeepFromObject(this.config, key, null);
    }
    supportInfo(){
        this.dioalogServ.imageDialog("assets/images/etc/flex_support.png")
    }
}
