import { Injectable } from '@angular/core';

@Injectable()
export class CommonConstantsService {

  constructor() { }

  public static URLs = {

    APP: 'http://localhost:4200/',
    API: 'https://localhost:44379/'
    // API: 'http://localhost:57841/'
  };

  public static AAD = {
    INSTANCE: "https://login.microsoftonline.com/",
    TENANT: "nitorinfotech.com",
    APPCLIENTID: "4fa90b6b-1681-4736-8956-51f38b11998f",
    APICLIENTID: "15bc0741-671a-4995-8603-5f128a254bc3"
  }
}
