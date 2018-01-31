import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StorageApi } from '../../../../backend/index';

@Injectable()
export class FileManagerService implements Resolve<any>
{
    onFilesChanged: BehaviorSubject<any> = new BehaviorSubject({});
    onFileSelected: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(private fileApi:StorageApi)
    {
    }

    /**
     * The File Manager App Main Resolver
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getFiles()
            ]).then(
                ([files]) => {
                    resolve();
                },
                reject
            );
        });
    }

    getFiles(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this.fileApi.getFiles("data1")
                .subscribe((response: any) => {
                    this.onFilesChanged.next(response);
                    this.onFileSelected.next(response[0]);
                    resolve(response);
                }, reject);
        });
    }
    download(file:any){
      return  this.fileApi.getFile(file.container,file.name);
    }

}
