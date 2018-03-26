import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';

import {AppAuthModule} from './core/auth/app-auth.module';
//import {NbAuthModule} from './core/auth/auth.module';

import { TranslateModule } from '@ngx-translate/core';
// import {ForgotPassword2Module} from './core/authentication/forgot-password-2/forgot-password-2.module'
// import {LockModule} from './core/authentication/lock/lock.module'
// import {Login2Module} from './core/authentication/login-2/login-2.module'
// import {MailConfirmModule} from './core/authentication/mail-confirm/mail-confirm.module'
// import {Register2Module} from './core/authentication/register-2/register-2.module'
// import {ResetPassword2Module} from './core/authentication/reset-password-2/reset-password-2.module'
import { SDKBrowserModule } from '../backend/index';
import {APP_BASE_HREF, registerLocaleData } from '@angular/common';
import {AuthGuard} from './auth-guard.service'
import { NbEmailPassAuthProvider } from './core/auth/providers/email-pass-auth.provider';
import { NbDummyAuthProvider } from './core/auth/providers/dummy-auth.provider';
import localePl from '@angular/common/locales/pl';

//import {AppRoutingModule} from './app-routing.module'
const routes: Routes = [];

registerLocaleData(localePl);
@NgModule({
    declarations: [
        AppComponent
        
    ],
    imports     : [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        //AppRoutingModule,
        SharedModule,
        TranslateModule.forRoot(),
        FuseMainModule,
        RouterModule.forRoot(routes),
        //ForgotPassword2Module,LockModule,MailConfirmModule,Register2Module,ResetPassword2Module,
        SDKBrowserModule.forRoot(),
        AppAuthModule.forRoot(),
       

        // NbAuthModule.forRoot({
        //     providers: {
        //       email: {
        //         service: NbEmailPassAuthProvider,
        //       },
        //     },
        //   }),
        
    ],
    providers   : [
        FuseSplashScreenService,
        FuseConfigService,
        FuseNavigationService,
        { provide: APP_BASE_HREF, useValue: '/tcm/' },
        AuthGuard,
        { provide: LOCALE_ID, useValue: 'pl' } 
        
    ],
    
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
