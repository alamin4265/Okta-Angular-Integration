import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { OKTA_CONFIG } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

import { AppModule } from './app/app.module';
import { environment as e } from './environments/environment';


export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

if (e.production) {
  enableProdMode();
}

fetch(e.oktaConfigUrl).then(async res => {
  const authConfig = await res.json();
  authConfig.redirectUri = window.location.origin + '/implicit/callback';

  platformBrowserDynamic([
    { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
    { provide: OKTA_CONFIG, useValue: { oktaAuth: new OktaAuth(authConfig) } }
   
  ]).bootstrapModule(AppModule)
    .catch(err => console.error(err));
});