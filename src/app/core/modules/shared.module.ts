import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxDnDModule } from '@withinpixels/ngx-dnd';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { FuseMatSidenavHelperDirective, FuseMatSidenavTogglerDirective } from '../directives/fuse-mat-sidenav-helper/fuse-mat-sidenav-helper.directive';
import { FuseMatSidenavHelperService } from '../directives/fuse-mat-sidenav-helper/fuse-mat-sidenav-helper.service';
import { FusePipesModule } from '../pipes/pipes.module';
import { FuseConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { FuseCountdownComponent } from '../components/countdown/countdown.component';
import { FuseMatchMedia } from '../services/match-media.service';
import { FuseNavbarVerticalService } from '../../main/navbar/vertical/navbar-vertical.service';
import { FuseHljsComponent } from '../components/hljs/hljs.component';
import { FusePerfectScrollbarDirective } from '../directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseIfOnDomDirective } from '../directives/fuse-if-on-dom/fuse-if-on-dom.directive';
import { FuseMaterialColorPickerComponent } from '../components/material-color-picker/material-color-picker.component';
import { FuseTranslationLoaderService } from '../services/translation-loader.service';

import { CookieService } from 'ngx-cookie-service';
import { TranslateModule } from '@ngx-translate/core';
import { AdminElementDirective } from '../directives/admin-element.directive';
import { HttpModule } from '@angular/http';
import { SmdDataTable,
    SmdDatatableHeader,
    SmdDatatableActionButton,
    SmdContextualDatatableButton,
    SmdDataTableColumnComponent,
    SmdDataTableRowComponent,
    SmdDataTableCellComponent,
    SmdDatatableDialogChangeValue
     } from '../components/smd-datatable/index';
import { SmdPaginatorComponent } from '../components/smd-paginator/index';
import {DropzoneModule} from "ngx-dropzone-wrapper";
import { DialogService } from '../services/dialog.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MediaDialogComponent } from '../dialogs/media-dialog/media-dialog.component';
import { SDKBrowserModule } from '../../../backend/index';
import { RolesElementDirective } from '../directives/roles-element.directive';
import { AuthElementDirective } from '../directives/auth-element.directive';
import { UseTermsComponent } from '../components/use-terms/use-terms.component';
import { RichTextEditorComponent } from '../components/rich-text-editor/rich-text-editor.component';
import { QuillModule } from 'ngx-quill';
import { KatexModule } from 'ng-katex';
import { InfoDialogComponent } from '../dialogs/info-dialog/info-dialog.component';
@NgModule({
    declarations   : [
        FuseMatSidenavHelperDirective,
        FuseMatSidenavTogglerDirective,
        FuseConfirmDialogComponent,
        FuseCountdownComponent,
        FuseHljsComponent,
        FuseIfOnDomDirective,
        FusePerfectScrollbarDirective,
        FuseMaterialColorPickerComponent,
        AdminElementDirective,
        SmdDataTable,
        SmdDatatableHeader,
        SmdDatatableActionButton,
        SmdContextualDatatableButton,
        SmdDataTableColumnComponent,
        SmdDataTableRowComponent,
        SmdDataTableCellComponent,
        SmdDatatableDialogChangeValue,
        SmdPaginatorComponent,
        ConfirmDialogComponent,
        MediaDialogComponent,
        RolesElementDirective,
        AuthElementDirective,
        UseTermsComponent,
        RichTextEditorComponent,
        InfoDialogComponent
        
    ],
    imports        : [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        FusePipesModule,
        ReactiveFormsModule,
        ColorPickerModule,
        NgxDnDModule,
        NgxDatatableModule,
        DropzoneModule,
        QuillModule,
        KatexModule 
    ],
    exports        : [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        FuseMatSidenavHelperDirective,
        FuseMatSidenavTogglerDirective,
        FusePipesModule,
        FuseCountdownComponent,
        FuseHljsComponent,
        FusePerfectScrollbarDirective,
        ReactiveFormsModule,
        ColorPickerModule,
        NgxDnDModule,
        NgxDatatableModule,
        FuseIfOnDomDirective,
        FuseMaterialColorPickerComponent,
        TranslateModule,
        AdminElementDirective,
        SmdDataTable,
        SmdDatatableHeader,
        SmdDatatableActionButton,
        SmdContextualDatatableButton,
        SmdDataTableColumnComponent,
        SmdDataTableRowComponent,
        SmdDataTableCellComponent,
        SmdDatatableDialogChangeValue,
        SmdPaginatorComponent,
        ConfirmDialogComponent,
        MediaDialogComponent,
        RolesElementDirective,
        AuthElementDirective,
        UseTermsComponent,
        RichTextEditorComponent,
        InfoDialogComponent
        
        
    ],
    entryComponents: [
        FuseConfirmDialogComponent,
        ConfirmDialogComponent,
        MediaDialogComponent,
        UseTermsComponent,
        InfoDialogComponent
    ],
    providers      : [
        CookieService,
        FuseMatchMedia,
        FuseNavbarVerticalService,
        FuseMatSidenavHelperService,
        FuseTranslationLoaderService,
        DialogService
    ]
})

export class SharedModule
{
    static forRoot(): any[] {
        return [
            CommonModule,
            HttpModule,
            FormsModule,
            MaterialModule,
            SharedModule,
            DropzoneModule
            
        ]
    }
}
