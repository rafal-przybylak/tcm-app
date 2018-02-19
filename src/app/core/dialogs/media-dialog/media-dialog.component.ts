import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import { CoreConfig} from "../../api.config";
import {LoopBackAuth} from "../../../../backend/services/core/auth.service";
import {UserApi} from "../../../../backend/services/custom/User";
//import {LoopBackFilter} from "../../models/base.model";
import {Media} from "../../../../backend/models/media";
import {DropzoneConfigInterface} from "ngx-dropzone-wrapper";
import { LoopBackConfig } from '../../../../backend/lb.config';
import { LoopBackFilter } from '../../../../backend/index';

@Component({
    selector: 'app-media-dialog',
    templateUrl: './media-dialog.component.html',
    styleUrls: ['./media-dialog.component.scss']
})
export class MediaDialogComponent implements OnInit {

    public title: string;
    public actionButton: string;
    public cancelButton: string;
    public selectedMedia: any[] = [];
    public selectLimit: number = 1;
    public acceptedFiles: any;
    public library: Media[] = [];
    notifyMessage: string;
    uploadErrorMessage: string;
    selectedTabIndex: number = 0;
    libraryLoadMoreButton: string = "Załaduj kolejne pliki";

    tabLibraryActive: boolean = false;
    imageFileTypes: string[] = [
        'image/jpeg',
        'image/gif',
        'image/png',
        'image/bmp'
    ];

    filter: LoopBackFilter = {
        limit: 24,
        skip: 0,
        order: ['createdAt DESC'],
        include: {}
    };

    public config: DropzoneConfigInterface = {
        headers: {},
        url: CoreConfig.getMediaUploadPath(),
        maxFilesize: CoreConfig.getDefaultMediaUploadMaxFilesize(),
        acceptedFiles: this.acceptedFiles,
        uploadMultiple: false,
        autoReset: 200
    };

    constructor(private auth: LoopBackAuth,
                private userService: UserApi,
                public dialog: MatDialogRef<MediaDialogComponent>) {

    }

    ngOnInit() {

        
        if (this.acceptedFiles) {
            this.config.acceptedFiles = this.acceptedFiles;
            let fileTypes: string[] = this.acceptedFiles.split(',');
           
            let whereOr = [];
            this.filter.where = {and: []};
            if (fileTypes.length) {
                fileTypes.forEach((name) => {
                    whereOr.push({type: name});
                });

                this.filter.where = {or: whereOr};
            }

        }
        if (this.auth.getAccessTokenId()) {
            let authHeader = {"Authorization": LoopBackConfig.getAuthPrefix() + this.auth.getAccessTokenId()};
            this.config.headers = Object.assign(this.config.headers, authHeader);
        }

    }

    onUploadSuccess(event: any) {


        this.uploadErrorMessage = null;
        this.selectedTabIndex = 1;
        if (event && typeof (event[1] !== "undefined") && event[1] !== null) {
            let uploadedItems = event[1];
            this.library = uploadedItems.concat(this.library);
            this.filter.skip = this.filter.skip + uploadedItems.length;
            for (let i = 0; i < uploadedItems.length; i++) {
                this.onSelectMedia(uploadedItems[i]);
            }

        }
    }

    onUploadError(event: any) {
        this.uploadErrorMessage = "Błąd podczas pobierania pliku.";
    }

    onTabChange(event: any) {

        if (this.tabLibraryActive == false) {

            this.loadMediaLibrary();
        }
        if (event.index == 1) {
            this.tabLibraryActive = true;
        }
    }

    loadMediaLibrary() {

        this.libraryLoadMoreButton = "Ładowanie...";
        let userId = this.auth.getCurrentUserId();

        this.userService.getMedia(userId, this.filter).subscribe(media => {
            this.libraryLoadMoreButton = "Załaduj kolejne pliki";
            if (!media || media.length == 0) {
                this.libraryLoadMoreButton = "Koniec załączników";
            }
            if (this.library.length) {

                this.library = this.library.concat(media);
            } else {
                this.library = media;
            }

        });
    }

    findById(items: any, item: any): number {
        if (items && items.length) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].id == item.id) {
                    return i;
                }
            }
        }
        return null;
    }

    isSelectedMedia(item: any): boolean {
        let items = this.selectedMedia;

        if (items && items.length) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].id == item.id) {
                    return true;
                }
            }
        }
        return false;
    }

    onSelectMedia(item: Media) {
        if (this.selectedMedia.length <= this.selectLimit) {
            this.notifyMessage = null;
        }
        let indexValue = this.findById(this.selectedMedia, item);
        if (indexValue !== null) {
            this.selectedMedia.splice(indexValue, 1);
        } else {
            if (this.selectLimit > this.selectedMedia.length) {
                this.selectedMedia.push(item);
            } else {
                this.notifyMessage = "Możesz wybrać tylko " + this.selectLimit+ " zdjęć.";
            }

        }
    }

    loadMoreLibrary() {
        this.libraryLoadMoreButton = "Ładowanie...";

        this.filter.skip = this.filter.skip + this.filter.limit;
        this.loadMediaLibrary();
    }

    isImageFileType(fileType: string): boolean {
        for (let i = 0; i < this.imageFileTypes.length; i++) {
            if (fileType === this.imageFileTypes[i]) {
                return true;
            }
        }
        return false;
    }
}
