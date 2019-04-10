import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Type } from '@angular/compiler';
import { User } from '../models/loyaltynetwork';

@Injectable({
  providedIn: 'root'
})
export class HttpService<Type> {

  private headers: Headers;
  private actionUrl: string;

  constructor(private http: Http) {
    this.actionUrl = 'http://localhost:3000/api/';
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
}

  getAll(namespace: string): Observable<Type[]> {
    console.log(`${this.actionUrl}` + namespace);
    return this.http.get(`${this.actionUrl}` + namespace)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getSingleInstance(namespace: string, id: string) {
    return this.http.get(`${this.actionUrl}` + namespace)
    .map(this.extractData)
    .catch(this.handleError);
  }

  addSingleInstance(namespace: string, asset: Type): Observable<Type>{
    return this.http.post(`${this.actionUrl}` + namespace, asset)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateSingleInstance(namespace: string, id: string, itemToUpdate: Type) {
    return this.http.get(`${this.actionUrl}${namespace}/${id}`, itemToUpdate)
    .map(this.extractData)
    .catch(this.handleError);
  }

  deleteSingleInstance(namespace: string, id: string,): Observable<Type>{
    return this.http.delete(`${this.actionUrl}${namespace}/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private handleError(error: any): Observable<string> {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
}

  private extractData(res: Response): any {
    return res.json();
}
}
