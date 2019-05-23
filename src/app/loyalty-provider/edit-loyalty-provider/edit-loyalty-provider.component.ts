import { Component, OnInit } from '@angular/core';
import { LoyaltyproviderService } from 'src/app/services/loyaltyprovider.service';
import { LoyaltyProvider } from 'src/app/models/loyaltynetwork';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-loyalty-provider',
  templateUrl: './edit-loyalty-provider.component.html',
  styleUrls: ['./edit-loyalty-provider.component.css']
})
export class EditLoyaltyProviderComponent implements OnInit {
  providerToEdit: LoyaltyProvider = new LoyaltyProvider();
  providerId: string;
  errorMessage: string;

  constructor(private loyaltyProviderService: LoyaltyproviderService, private route: ActivatedRoute, 
              private router: Router, private location: Location) {
    this.providerId = this.route.snapshot.paramMap.get('providerId').valueOf();
    this.loyaltyProviderService.getProvider(this.providerId)
    .toPromise()
    .then(result => {
      this.providerToEdit = result;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  ngOnInit() {
  
  }

  onSubmit(): void {
    this.loyaltyProviderService.updateProvider(this.providerToEdit)
    .toPromise()
    .then(() => {
      this.router.navigateByUrl('loyalty-provider');
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
   
  }

  goBack(): void {
    this.location.back();
  }

}
