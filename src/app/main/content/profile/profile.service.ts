import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserApi } from '../../../../backend/services/custom/User';
import { UserDataApi, LoopBackAuth } from '../../../../backend/index';
import { User } from '../../../../backend/models/User';

@Injectable()
export class ProfileService implements Resolve<any>
{
   
    timeline: any;
    about: User;
    photosVideos: any;

    timelineOnChanged: BehaviorSubject<any> = new BehaviorSubject({});
    aboutOnChanged: BehaviorSubject<User> = new BehaviorSubject(new User());
    photosVideosOnChanged: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(private auth:LoopBackAuth, private http: HttpClient,private userApi:UserApi,private userDataApi:UserDataApi)
    {
    }

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        
        return new Promise((resolve, reject) => {
            Promise.all([
                
                this.getAbout(),
                
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get timeline
     */
    
    /**
     * Get about
     */
    getAbout(): Promise<User>
    {
        return new Promise((resolve, reject) => {

           this.userApi.findById<User>(this.auth.getCurrentUserId(),{include:'userData'})
                .subscribe((about) => {
                    this.about = about;
                    this.aboutOnChanged.next(this.about);
                    resolve(this.about);
                }, reject);
        });
    }

    public saveUser(data): Observable<any>{
        return this.userApi.patchAttributes(this.auth.getCurrentUserId(),data);
    }
    public saveUserData(data): Observable<any>{
        if (this.about.userData){
            return this.userApi.updateUserData(this.auth.getCurrentUserId(),data);
        }else{
            return this.userApi.createUserData(this.auth.getCurrentUserId(),data).map(resp=>this.about.userData=resp);
        }
        
    }
}
