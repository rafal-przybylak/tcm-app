import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TestApi as TApi, Test as T, UserApi, LoopBackAuth } from '../../../../backend/index';
import { NbAuthService } from '../../../core/auth/index';

@Injectable()
export class ExamService implements Resolve<T>
{

    routeParams: any;
    object: T;
    onObjectChanged: BehaviorSubject<T> = new BehaviorSubject({} as T);
    objects: T[];
    onObjectsChanged: BehaviorSubject<T[]> = new BehaviorSubject({} as T[]);


    constructor(private dataService: TApi, private userApi: UserApi, private loopbackApi: LoopBackAuth, private auth: NbAuthService) {

    }
    popupResolve(id: number): Observable<T> | Promise<T> | any {

        this.routeParams = { 'id': id };
        if (this.routeParams.id == 0) {
            this.object = new T();
            return Promise.resolve(this.object);
        }
        else if (this.routeParams.id > 0) {
            return new Promise((resolve, reject) => {

                Promise.all([
                    this.getObject()
                ]).then(
                    () => {
                        resolve();
                    },
                    reject
                    );
            });
        }
        else {
            return new Promise((resolve, reject) => {

                Promise.all([
                    this.getObjects()
                ]).then(
                    () => {
                        resolve();
                    },
                    reject
                    );
            });
        }

    }
    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<T> | Promise<T> | T}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | any {

        this.routeParams = route.params;
        if (this.routeParams.id) {
            if (this.routeParams.id == 0) {
                this.object = new T();
                return Promise.resolve(this.object);
            }
            else {
                return new Promise((resolve, reject) => {

                    Promise.all([
                        this.getObject()
                    ]).then(
                        () => {
                            resolve();
                        },
                        reject
                        );
                });
            }

        }
        else {
            return new Promise((resolve, reject) => {

                Promise.all([
                    this.getObjects()
                ]).then(
                    () => {
                        resolve();
                    },
                    reject
                    );
            });
        }

    }

    getObject(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.auth.isAdmin) {
                this.dataService.findById<T>(this.routeParams.id)
                    .subscribe((response: T) => {
                        this.object = response;
                        this.onObjectChanged.next(this.object);
                        resolve(response);
                    }, reject);
            } else {
                this.userApi.getCourses(this.loopbackApi.getCurrentUserId()).subscribe(datas => {
                    this.dataService.findById<T>(this.routeParams.id, { where: { courseId: { inq: datas.map(o => o.id) } } })
                        .subscribe((response: T) => {
                            this.object = response;
                            this.onObjectChanged.next(this.object);
                            resolve(response);
                        }, reject);
                });


            }
        });
    }

    getObjects(): Promise<any> {
        let x =this.dataService;
        return new Promise((resolve, reject) => {
            if (this.auth.isAdmin) {
                this.dataService.find<T>()
                    .subscribe((response: T[]) => {
                        this.objects = response;
                        this.onObjectsChanged.next(this.objects);
                        resolve(response);
                    }, reject);
            } else {
                this.userApi.getCourses(this.loopbackApi.getCurrentUserId()).subscribe(datas => {
                    this.dataService.find<T>({  where: { courseId: { inq: datas.map(o => o.id) } } })
                        .subscribe((response: T[]) => {
                            this.objects = response;
                            this.onObjectsChanged.next(this.objects);
                            resolve(response);
                        }, reject);
                });
            }
        });
    }
    saveObject(object) {
        return new Promise((resolve, reject) => {
            this.dataService.updateAttributes(this.routeParams.id, object)
                .subscribe((response: T) => {
                    resolve(response);
                }, reject);
        });
    }

    addObject(object) {
        return new Promise((resolve, reject) => {
            this.dataService.create(object)
                .subscribe((response: T) => {
                    resolve(response);
                }, reject);
        });
    }
    removeObject(object) {
        return this.dataService.deleteById<T>(object.id);
    }
}
