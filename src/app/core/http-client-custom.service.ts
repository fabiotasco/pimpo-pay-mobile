import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpOptions } from '../models/http-options';
import { catchError } from 'rxjs/operators';
import { ToastHelperService } from './toast-helper.service';

@Injectable({ providedIn: 'root' })
export class HttpClientCustom {
  constructor(private httpClient: HttpClient, private toastHelper: ToastHelperService) {}

  public search(url, params: any = {}, headers: any = {}): Observable<Array<any>> {
    let httpOptions: HttpOptions = this.buildHttpOptions(params, headers);

    return this.httpClient.get<any>(url, {
      headers: httpOptions.headers,
      params: httpOptions.params,
      withCredentials: true
    });
  }

  public find(url, key: any, headers: any = {}): Observable<Object> {
    let httpOptions: HttpOptions = this.buildHttpOptions(null, headers);

    return this.httpClient.get<any>(`${url}/${key}`, { headers: httpOptions.headers, withCredentials: true });
  }

  public save(url, persistObj: any, primaryKey: string = null, headers: any = {}): Observable<any> {
    let httpOptions: HttpOptions = this.buildHttpOptions(null, headers);
    const key = this.getPrimaryKeyValue(primaryKey, persistObj);

    if (!key) {
      return this.httpClient
        .post<any>(url, persistObj, { headers: httpOptions.headers, withCredentials: true })
        .pipe(catchError(err => this.errorHandler(err)));
    } else {
      return this.httpClient
        .put<any>(url, persistObj, { headers: httpOptions.headers, withCredentials: true })
        .pipe(catchError(err => this.errorHandler(err)));
    }
  }

  public action(url, data: any, headers: any = {}): Observable<any> {
    let httpOptions: HttpOptions = this.buildHttpOptions(null, headers);
    return this.httpClient
      .post<any>(url, data, { headers: httpOptions.headers })
      .pipe(catchError(err => this.errorHandler(err)));
  }

  public deactivate(url, key: any, headers: any = {}): Observable<Object> {
    let httpOptions: HttpOptions = this.buildHttpOptions(null, headers);

    return this.httpClient
      .delete<any>(`${url}/${key}`, {
        headers: httpOptions.headers,
        params: httpOptions.params,
        withCredentials: true
      })
      .pipe(catchError(err => this.errorHandler(err)));
  }

  private buildHttpOptions(params: any, headers: any): HttpOptions {
    let httpParams: HttpParams = new HttpParams();
    let httpHeaders: HttpHeaders = new HttpHeaders();

    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.append(key, params[key]);
      });
    }

    if (headers) {
      Object.keys(headers).forEach(key => {
        httpHeaders = httpHeaders.append(key, headers[key]);
      });
    }

    return {
      params: httpParams,
      headers: httpHeaders
    };
  }

  private getPrimaryKeyValue(primaryKey: string, persistObj: any) {
    let value = persistObj.id;

    if (primaryKey) {
      Object.keys(persistObj).forEach(key => {
        if (key === primaryKey) {
          value = persistObj[key];
        }
      });
    }

    return value;
  }

  private errorHandler(err) {
    this.toastHelper.showToast(`${err.status} ${err.statusText}`);
    return err.message;
  }
}
