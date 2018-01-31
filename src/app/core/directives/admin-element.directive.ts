import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { NbAuthService } from '../auth/index';

@Directive({
  selector: '[tcmAdminElement]'
})
export class AdminElementDirective {

  constructor(private el: ElementRef, private auth: NbAuthService) {
    
        let isAdmin = this.auth.isAdmin;
        if (!isAdmin) {
          this.el.nativeElement.hidden = true;
        }
        this.auth._isAdmin.subscribe(admin => {
          if (!admin) {
            this.el.nativeElement.hidden =true;
          } else {
            this.el.nativeElement.hidden =false;
          }
        });
    
      }

}