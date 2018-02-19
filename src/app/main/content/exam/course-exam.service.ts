import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CourseTestApi as TApi, CourseTest as T, UserApi, LoopBackAuth, CourseTest } from '../../../../backend/index';
import { NbAuthService } from '../../../core/auth/index';

@Injectable()
export class CourseExamService implements Resolve<T>
{

    routeParams: any;
    object: T;
    onObjectChanged: BehaviorSubject<T> = new BehaviorSubject({} as T);
    objects: T[];
    onObjectsChanged: BehaviorSubject<T[]> = new BehaviorSubject({} as T[]);


    constructor(private dataService: TApi, private userApi: UserApi, private loopbackApi: LoopBackAuth, private auth: NbAuthService, private route: ActivatedRoute) {

    }
    popupResolve(id: number): Observable<T> | Promise<T> | any {
        this.route.paramMap.subscribe(params => {
            if (!(params.get("preview") == "true")) {
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
        });
    }
    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<T> | Promise<T> | T}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | any {
        if(route.params.preview) return new Promise((resolve, reject) => {resolve()});

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
                    this.dataService.findById<T>(this.routeParams.id, {include:{test:'testQuestions'}, where: { courseId: { inq: datas.map(o => o.id) } } })
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
        return new Promise((resolve, reject) => {
            if (this.auth.isAdmin) {
                this.dataService.find<T>({ include: ['course', 'test'] })
                    .subscribe((response: T[]) => {
                        this.objects = response;
                        this.onObjectsChanged.next(this.objects);
                        resolve(response);
                    }, reject);
            } else {
                this.userApi.getCourses(this.loopbackApi.getCurrentUserId()).subscribe(datas => {
                    this.dataService.find<T>({ include: ['course', 'test'], where: { courseId: { inq: datas.map(o => o.id) } } })
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
