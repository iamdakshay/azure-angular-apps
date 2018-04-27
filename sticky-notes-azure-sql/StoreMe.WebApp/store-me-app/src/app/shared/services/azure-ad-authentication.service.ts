import { Injectable } from '@angular/core';
import { Adal4Service } from 'adal-angular4/adal4.service';
import { CommonConstantsService } from './common-constants.service'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AzureAdAuthenticationService {

  constructor(private service: Adal4Service) { }

  handleAuthenticationCallback() {

    const config = {
      instance: CommonConstantsService.AAD.INSTANCE,
      tenant: CommonConstantsService.AAD.TENANT,
      clientId: CommonConstantsService.AAD.APPCLIENTID,
      endpoints: {}
    };

    if (this.service) {

      config.endpoints[CommonConstantsService.URLs.API] = CommonConstantsService.AAD.APICLIENTID;

      this.service.init(config);

      // Handle callback if this is a redirect from Azure
      this.service.handleWindowCallback();

      // Check if the user is authenticated. If not, call the login() method
      if (!this.service.userInfo.authenticated) {
        this.service.login();
      }
      else{
        sessionStorage.setItem("StoreMeUser", this.service.userInfo.username);
      }
    }
  }
}
