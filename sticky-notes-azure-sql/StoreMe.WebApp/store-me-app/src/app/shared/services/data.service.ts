import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Observable } from 'rxjs/Observable';
import { Adal4Service } from 'adal-angular4/adal4.service';

import { CommonConstantsService } from './common-constants.service'

@Injectable()
export class DataService {

  constructor(private http: HttpClient, private adal4Service: Adal4Service) { }

  private getHttpRequestOptions(token) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      })
    };
  }

  public get(url): Observable<any> {

    if (this.adal4Service.userInfo.authenticated) {
      const httpOptions = this.getHttpRequestOptions(this.adal4Service.userInfo.token);
      return this.http
        .get(CommonConstantsService.URLs.API + url, httpOptions);
    }
    else {
      this.adal4Service.login();
    }
  }

  public post(url, requestData): Observable<any> {

    if (this.adal4Service.userInfo.authenticated) {
      const httpOptions = this.getHttpRequestOptions(this.adal4Service.userInfo.token);
      return this.http
        .post(CommonConstantsService.URLs.API + url, requestData, httpOptions);
    }
    else {
      this.adal4Service.login();
    }
  }

  public put(url, requestdata): Observable<any> {

    if (this.adal4Service.userInfo.authenticated) {
      const httpOptions = this.getHttpRequestOptions(this.adal4Service.userInfo.token);
      return this.http
        .put(CommonConstantsService.URLs.API + url, requestdata, httpOptions);
    }
    else {
      this.adal4Service.login();
    }
  }

  public delete(url) {

    if (this.adal4Service.userInfo.authenticated) {
      const httpOptions = this.getHttpRequestOptions(this.adal4Service.userInfo.token);
      return this.http
        .delete(CommonConstantsService.URLs.API + url, httpOptions);
    }
    else {
      this.adal4Service.login();
    }
  }
}