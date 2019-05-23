import { Injectable } from '@angular/core';
import { LoyaltyPartner } from '../models/loyaltynetwork';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  private errorMessage: any;
  private category = 'LoyaltyPartner';

  constructor(private httpService: HttpService<LoyaltyPartner>) { }

  getAllPartners(filter?: string): Observable<LoyaltyPartner[]> {
    return this.httpService.getAll(this.category, filter);
  }

  getPartner(id: string, filter?: string): Observable<LoyaltyPartner> {
    return this.httpService.getSingleInstance(this.category, id, filter);
  }
  
  addPartner(instance: LoyaltyPartner): Observable<LoyaltyPartner> {
    return this.httpService.addSingleInstance(this.category, instance);
  }

  updatePartner(instance: LoyaltyPartner): Observable<LoyaltyPartner> {
    return this.httpService.updateSingleInstance(this.category, instance.userId, instance);
  }
  
  deletePartner(id: string): Observable<LoyaltyPartner> {
    return this.httpService.deleteSingleInstance(this.category, id);
  }
}
