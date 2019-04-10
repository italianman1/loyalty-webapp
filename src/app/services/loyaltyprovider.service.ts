import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { LoyaltyProvider } from '../models/loyaltynetwork';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyproviderService {
  private errorMessage: any;
  private category = 'LoyaltyProvider';

  constructor(private httpService: HttpService<LoyaltyProvider>) { }

  getAllProviders(): Observable<LoyaltyProvider[]> {
    return this.httpService.getAll(this.category);
  }
  
  addProvider(instance: LoyaltyProvider): Observable<LoyaltyProvider> {
    return this.httpService.addSingleInstance(this.category, instance);
  }

  updateProvider(instance: LoyaltyProvider): Observable<LoyaltyProvider> {
    return this.httpService.updateSingleInstance(this.category, instance.userId, instance);
  }
  
  deleteProvider(id: string): Observable<LoyaltyProvider> {
    return this.httpService.deleteSingleInstance(this.category, id);
  }
}
