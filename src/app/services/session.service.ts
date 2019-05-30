import { Injectable } from '@angular/core';
import { CustomerService } from './customer.service';
import { SolutionproviderService } from './solutionprovider.service';
import { PartnerService } from './partner.service';
import { LoyaltyproviderService } from './loyaltyprovider.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private selectedTransaction;
  public signedInUser;

  constructor(private customerService: CustomerService, private solutionProviderService: SolutionproviderService, 
              private partnerService: PartnerService, private loyaltyProviderService: LoyaltyproviderService) {
  }

  getSelectedTransaction(){
    return this.selectedTransaction;
  }

  setSelectedTransaction(transaction){
    this.selectedTransaction = transaction;
  }

  getSignedInUser(filter?: string): Promise<any> {
    let userId = localStorage.getItem('signedInUser');
    let role = localStorage.getItem('signedInUserRole');

    if (role == 'Customer') {
      if(filter == "minimal"){
        return this.customerService.getCustomer(userId).toPromise();
      }
      return this.customerService.getCustomer(userId, '{"include": "resolve"}').toPromise();
    }

    if (role == 'SolutionProvider') {
      if(filter == "minimal"){
        return this.solutionProviderService.getSolutionProvider(userId).toPromise();
      }

      return this.solutionProviderService.getSolutionProvider(userId, '{"include": "resolve"}').toPromise();
    }

    if (role == 'Partner') {
      if(filter == "minimal"){
        return this.partnerService.getPartner(userId).toPromise();
      }

      return this.partnerService.getPartner(userId, '{"include": "resolve"}').toPromise();
    }

    if (role == 'Provider') {
      if(filter == "minimal"){
        return this.loyaltyProviderService.getProvider(userId).toPromise();
      }
      return this.loyaltyProviderService.getProvider(userId, '{"include": "resolve"}').toPromise();
    }

    if (role == null || role == '') {
      return null;
    }
  }

  setSignedInUser(userId, role) {
    localStorage.setItem('signedInUser', userId);
    localStorage.setItem('signedInUserRole', role);
  }
}
