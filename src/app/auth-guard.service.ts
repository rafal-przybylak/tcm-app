import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NbAuthService } from './core/auth';
//import { Observable } from 'rxjs/Observable';
import {Observable} from 'rxjs/Rx';
import "rxjs/add/observable/zip";
import "rxjs/add/observable/never";
import { DialogService } from './core/services/dialog.service';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router,private dialServ :DialogService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    let isInRole$;
    const expectedRole = route.data.expectedRole;
    let isInRole = false;
    let isAuth$=this.authService.isAuthenticated()
    .do(authenticated => {
      if (!authenticated) {
        this.router.navigate(['auth-login']);
      }
    });
    if(expectedRole){
        isInRole$=this.authService._userRoles.map(roles => {
        if(expectedRole){
  
        }
        expectedRole.forEach(role => {
          isInRole = isInRole || roles.includes(role);
        })
        return isInRole;
      });
    }
    else
      isInRole$=Observable.never<boolean>().startWith(true);
    
   return Observable.zip(isAuth$,isInRole$,(atuth:boolean,inRole:boolean)=>{
   
    if(atuth &&  (expectedRole == undefined || expectedRole.length==0 ||  inRole)){
      return true;
    }else{
      let dialogRef =this.dialServ.confirm("Brak dostępu", "","","",{width: '240px'});
      dialogRef.afterClosed().subscribe(confirm => {});
      return false;
    }
    
   });

    // return this.authService.isAuthenticated()
    //   .do(authenticated => {
    //     if (!authenticated) {
    //       this.router.navigate(['auth-login']);
    //     }
    //     // else if (expectedRole != undefined && expectedRole.length>0) {

    //     //   this.authService._userRoles.subscribe(roles => {
    //     //     expectedRole.forEach(role => {
    //     //       isInRole = isInRole || roles.includes(role);
    //     //     })
    //     //   });
    //     //   if (!isInRole) {
    //     //     this.router.navigate(['auth-login']);
    //     //   }
    //     // }
    //   })
    //   .map((res: boolean) => {
    //     if (res && (expectedRole != undefined && expectedRole.length>0)) {
    //       this.authService._userRoles.subscribe(roles => {
    //         expectedRole.forEach(role => {
    //           isInRole = isInRole || roles.includes(role);
    //         })
    //         return isInRole;
    //       });
         
    //     } else {
    //       return res;
    //     }
    //   });
  }
}
