import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { PartnerService } from '../services/partner.service';
import { LoyaltyproviderService } from '../services/loyaltyprovider.service';
import { SessionService } from '../services/session.service';
import { SolutionproviderService } from '../services/solutionprovider.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private signedInUser;
  private allAdmins: Observable<any[]>;
  private allPartners: Observable<any[]>;
  private allCustomers: Observable<any[]>;
  private allProviders: Observable<any[]>;

  constructor(private customerService: CustomerService, private partnerService: PartnerService,
              private providerService: LoyaltyproviderService, private sessionService: SessionService, 
              private solutionProviderService: SolutionproviderService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getUser() {
    this.sessionService.getSignedInUser("minimal")
    .then(user => {
      if (user) {
        this.signedInUser = user;
      }

      if (!user) {
        this.changeUser('Henk1', 'Customer');
      }
    })
    .catch(() => {
      this.changeUser('Henk1', 'Customer');
    });

  }

  getAllUsers() {
   this.allAdmins = this.solutionProviderService.getAllSolutionProviders();
   this.allPartners =  this.partnerService.getAllPartners();
   this.allCustomers = this.customerService.getAllCustomers();
   this.allProviders = this.providerService.getAllProviders();
   this.getUser();
  }

  changeUser(userId, role) {
    this.sessionService.setSignedInUser(userId, role);
    this.getUser();
  }
}
