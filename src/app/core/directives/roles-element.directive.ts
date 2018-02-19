import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { NbAuthService } from '../auth/index';

@Directive({
  selector: '[tcmRolesElement]'
})
export class RolesElementDirective implements OnInit {
  @Input('tcmRolesElement') roles: string[];
  ngOnInit(): void {
    let isInRole = false;
   let __this=this;
    this.auth._userRoles.subscribe(userRoles => {
      __this.roles.forEach(role => {
        isInRole = isInRole || userRoles.includes(role);
      })
      if (!isInRole) {
        __this.el.nativeElement.hidden =true;
      } else {
        __this.el.nativeElement.hidden =false;
      }
    });
  }
 
  constructor(private el: ElementRef, private auth: NbAuthService) {
    
  }

}
