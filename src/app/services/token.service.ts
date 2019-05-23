import { Injectable } from '@angular/core';
import { LoyaltyToken } from '../models/loyaltynetwork';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private category = 'LoyaltyToken';

  constructor(private httpService: HttpService<LoyaltyToken>) { }

  getAllTokens(): Observable<LoyaltyToken[]> {
    return this.httpService.getAll(this.category);
  }

  getToken(id: string): Observable<LoyaltyToken> {
    return this.httpService.getSingleInstance(this.category, id);
  }
  addToken(instance: LoyaltyToken): Observable<LoyaltyToken> {
    return this.httpService.addSingleInstance(this.category, instance);
  }

  updateToken(instance: LoyaltyToken): Observable<LoyaltyToken> {
    return this.httpService.updateSingleInstance(this.category, instance.tokenId, instance);
  }
  deleteToken(id: string): Observable<LoyaltyToken> {
    return this.httpService.deleteSingleInstance(this.category, id);
  }
}
