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
    TENANT: "",
    APPCLIENTID: "",
    APICLIENTID: ""
  }
}
