import { Injectable } from '@angular/core';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { HttpClientCustom } from '../core/http-client-custom.service';
import { Observable } from 'rxjs';
import { endpoint } from '../utils/variables';

export abstract class BaseService<T> {
  protected endpointService: string;

  constructor(protected httpClient: HttpClientCustom, protected urlService: string) {
    this.httpClient = httpClient;
    this.endpointService = `${endpoint}${urlService}`;
  }

  public search(url, params: any = {}, headers: any = {}): Observable<Array<any>> {
    return this.httpClient.search(`${this.endpointService}${url}`, params, headers);
  }

  public find(url, key: any, headers: any = {}): Observable<Object> {
    return this.httpClient.find(`${this.endpointService}${url}`, key, headers);
  }

  public save(url, persistObj: any, primaryKey: string = null, headers: any = {}): Observable<any> {
    return this.httpClient.save(`${this.endpointService}${url}`, persistObj, primaryKey, headers);
  }

  public action(url, data: any, headers: any = {}): Observable<any> {
    return this.httpClient.action(`${this.endpointService}${url}`, data, headers);
  }

  public deactivate(url, key: any, headers: any = {}): Observable<Object> {
    return this.httpClient.deactivate(`${this.endpointService}${url}`, key, headers);
  }
}
