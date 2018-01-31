import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule,NB_AUTH_TOKEN_WRAPPER_TOKEN, NbAuthSimpleToken } from './index';
import {getDeepFromObject } from './helpers';
import { NbEmailPassAuthProvider } from './providers/email-pass-auth.provider';
import { throwIfAlreadyLoaded } from './providers/module-import-guard';


const NB_CORE_PROVIDERS = [
  NbAuthModule.forRoot({
    providers: {
      email: {
        service: NbEmailPassAuthProvider,
      },
    },
  }).providers,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class AppAuthModule {
  constructor(@Optional() @SkipSelf() parentModule: AppAuthModule) {
    throwIfAlreadyLoaded(parentModule, 'AppAuthModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: AppAuthModule,
      providers: [
        ...NB_CORE_PROVIDERS,NbEmailPassAuthProvider
      ],
    };
  }
}
