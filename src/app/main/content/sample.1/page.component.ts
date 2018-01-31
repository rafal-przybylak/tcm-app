import { Component } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as polish } from './i18n/pl';

@Component({
    selector   : 'fuse-sample',
    templateUrl: './page.component.html',
    styleUrls  : ['./page.component.scss']
})
export class PageComponent
{
    constructor(private translationLoader: FuseTranslationLoaderService)
    {
        this.translationLoader.loadTranslations(english, polish);
    }
}
