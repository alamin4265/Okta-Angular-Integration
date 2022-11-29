import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class OktaConfigService {
  private oktaConfig!: IOktaConfig;
  private accessPointUrl: string;

  constructor(private commonService: CommonService) {
    this.accessPointUrl = commonService.baseUrl + 'configurations';
  }

  loadOktaConfig() {
    return this.commonService.http.get<IOktaConfig>(`${this.accessPointUrl}/okta`)
      .toPromise()
      .then(results => {
        this.oktaConfig = <IOktaConfig>(results);
      }, error => console.error(error));
  }
  getRoleName(): Observable<string> {
    return this.commonService.http.get<string>(`${this.accessPointUrl}/getRole`);
  }

  get config() {
    return {
      clientId: this.oktaConfig.clientId,
      redirectUri: window.location.origin + '/implicit/callback',
      issuer: this.oktaConfig.issuer
    }
  }
}


export interface IOktaConfig {
  clientId: string;
  redirectUri: string;
  issuer: string;
}

