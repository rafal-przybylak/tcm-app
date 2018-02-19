import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MediaDialogComponent } from '../dialogs/media-dialog/media-dialog.component';
import { InfoDialogComponent } from '../dialogs/info-dialog/info-dialog.component';

@Injectable()
export class DialogService {

    constructor(public dialog: MatDialog) {

    }

    confirm(title: string = "Czy jesteś pewien?", message: string = "", actionTitle: string = "Wykonaj", cancelTitle: string = "Anuluj", config= {width: "600px"}): MatDialogRef<ConfirmDialogComponent> {

        let ref: MatDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent, config);
        ref.componentInstance.title = title;
        ref.componentInstance.message = message;
        ref.componentInstance.actionButton = actionTitle;
        ref.componentInstance.cancelButton = cancelTitle;
        return ref;
    }
    confirmWithValue(inputDataValue:string,title: string = "Czy jesteś pewien?", message: string = "", actionTitle: string = "Wykonaj", cancelTitle: string = "Anuluj",  config= {width: "600px"}): MatDialogRef<ConfirmDialogComponent> {

        let ref: MatDialogRef<ConfirmDialogComponent,{choice:boolean,value:string}> = this.dialog.open(ConfirmDialogComponent, config);
        ref.componentInstance.title = title;
        ref.componentInstance.message = message;
        ref.componentInstance.actionButton = actionTitle;
        ref.componentInstance.cancelButton = cancelTitle;
        ref.componentInstance.inputDataTitle=inputDataValue;
        return ref;
    }
    openMediaPicker(title = "Wybierz plik", actionTitle = "Dodaj", cancelTitle: string = "Anuluj", uploadConfig?: {selectLimit:number, acceptedFiles?: string}, dialogConfig= {width: "600px"}): MatDialogRef<MediaDialogComponent> {
        let ref: MatDialogRef<MediaDialogComponent> = this.dialog.open(MediaDialogComponent, dialogConfig);


        ref.componentInstance.title = title;
        ref.componentInstance.actionButton = actionTitle;
        ref.componentInstance.cancelButton = cancelTitle;

        ref.componentInstance.acceptedFiles = uploadConfig.acceptedFiles;
        ref.componentInstance.selectLimit = uploadConfig.selectLimit;

        return ref;
    }
    imageDialog(source:string): MatDialogRef<InfoDialogComponent> {

        let ref: MatDialogRef<InfoDialogComponent> = this.dialog.open(InfoDialogComponent);
        ref.componentInstance.source = source

        return ref;
    }
}
