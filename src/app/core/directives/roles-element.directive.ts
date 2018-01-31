import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { NbAuthService } from '../auth/index';

@Directive({
  selector: '[tcmRolesElement]'
})
export class RolesElementDirective implements OnInit {
  @Input('tcmRolesElement') roles: string[];
  ngOnInit(): void {
    let isInRole = false;
   
    this.auth._userRoles.subscribe(userRoles => {
      this.roles.forEach(role => {
        isInRole = isInRole || userRoles.includes(role);
      })
      if (!isInRole) {
        this.el.nativeElement.hidden =true;
      } else {
        this.el.nativeElement.hidden =false;
      }
    });
  }
 
  constructor(private el: ElementRef, private auth: NbAuthService) {
    
  }

}
