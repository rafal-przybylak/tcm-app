import { NgModule } from '@angular/core';

import { KeysPipe } from './keys.pipe';
import { GetByIdPipe } from './getById.pipe';
import { HtmlToPlaintextPipe } from './htmlToPlaintext.pipe';
import { FilterPipe } from './filter.pipe';
import { CamelCaseToDashPipe } from './camelCaseToDash.pipe';
import { DateFormatPipe } from './date-format.pipe';
import { MediaUrlPipe } from './media-url.pipe';
import { ThumbnailPipe } from './thumbnail.pipe';

@NgModule({
    declarations: [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        DateFormatPipe,
        MediaUrlPipe,
        ThumbnailPipe,

    ],
    imports     : [],
    exports     : [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        DateFormatPipe,
        MediaUrlPipe,
        ThumbnailPipe,
    ]
})

export class FusePipesModule
{

}
