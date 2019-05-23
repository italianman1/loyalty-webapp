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

  getSignedInUser(): Promise<any> {
    let userId = localStorage.getItem('signedInUser');
    let role = localStorage.getItem('signedInUserRole');

    if (role == 'Customer') {
      return this.customerService.getCustomer(userId, '{"include": "resolve"}').toPromise();
    }

    if (role == 'SolutionProvider') {
      return this.solutionProviderService.getSolutionProvider(userId, '{"include": "resolve"}').toPromise();
    }

    if (role == 'Partner') {
      return this.partnerService.getPartner(userId, '{"include": "resolve"}').toPromise();
    }

    if (role == 'Provider') {
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
