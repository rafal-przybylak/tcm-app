import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { NbAuthService } from '../auth/index';

@Directive({
  selector: '[tcmAuthElement]'
})
export class AuthElementDirective implements OnInit{
  @Input('tcmAuthElement') ifAuth:boolean=true;
  constructor(private el: ElementRef, private auth: NbAuthService) {}
  ngOnInit(): void {
    this.auth.isAuthenticated().subscribe(auth => {
      if (!(auth== this.ifAuth)) {
        this.el.nativeElement.hidden =true;
      } else {
        this.el.nativeElement.hidden =false;
      }
    });
  }
 
 
  

}
