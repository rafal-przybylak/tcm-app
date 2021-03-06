import { Component } from '@angular/core';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector   : 'fuse-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    constructor(
        private fuseSplashScreen: FuseSplashScreenService,
        private translate: TranslateService
    )
    {
        // Add languages
        this.translate.addLangs(['pl', 'en']);

        // Set the default language
        this.translate.setDefaultLang('pl');

        // Use a language
        this.translate.use('pl');
    }
}
 