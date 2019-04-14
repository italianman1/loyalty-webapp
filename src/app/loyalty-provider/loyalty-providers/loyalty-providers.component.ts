import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { User, LoyaltyProvider } from '../../models/loyaltynetwork';
import { LoyaltyproviderService } from 'src/app/services/loyaltyprovider.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loyalty-providers',
  templateUrl: './loyalty-providers.component.html',
  styleUrls: ['./loyalty-providers.component.css']
})
export class LoyaltyProvidersComponent implements OnInit {
  private errorMessage;
  allProviders: Observable<LoyaltyProvider[]>;

  constructor(private loyaltyProviderService: LoyaltyproviderService, private router: Router){ }

  ngOnInit() {
    this.getProviders();
  }

  getProviders() {
    this.allProviders = this.loyaltyProviderService.getAllProviders();
  }

  deleteProvider(id: string) {
    console.log(id);
    this.loyaltyProviderService.deleteProvider(id)
    .toPromise()
    .then(() => {
      this.getProviders();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }
}
