import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { joinProgram } from '../models/loyaltynetwork';
import { HttpService } from './http.service';
import { Type } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpService: HttpService<Type>) { }
  
  joinProgram(instance: Type): Observable<Type> {
    return this.httpService.addSingleInstance('joinProgram', instance);
  }

  exitProgram(instance: Type): Observable<Type> {
    return this.httpService.addSingleInstance('exitProgram', instance);
  }

  earnTokens(instance: Type): Observable<Type> {
    return this.httpService.addSingleInstance('earnTokens', instance);
  }

  redeemTokens(instance: Type): Observable<Type> {
    return this.httpService.addSingleInstance('redeemTokens', instance);
  }


  issueTokens(instance: Type): Observable<Type> {
    return this.httpService.addSingleInstance('issueTokens', instance);
  }
}
