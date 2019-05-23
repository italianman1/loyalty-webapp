import { Component, OnInit } from '@angular/core';
import { LoyaltyProvider } from 'src/app/models/loyaltynetwork';
import { Router, ActivatedRoute } from '@angular/router';
import { LoyaltyproviderService } from 'src/app/services/loyaltyprovider.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-loyalty-provider',
  templateUrl: './add-loyalty-provider.component.html',
  styleUrls: ['./add-loyalty-provider.component.css']
})
export class AddLoyaltyProviderComponent implements OnInit {
  provider;
  validName = true;
  validEmail = true;
  errorMessage;

  constructor(private router: Router, private location: Location,
              private route: ActivatedRoute, private loyaltyProviderService: LoyaltyproviderService) { }

  ngOnInit() {

  }

  onSubmit(companyName, companyEmail, ConversionRate): void {

      this.provider = {
        $class: 'loyaltynetwork.LoyaltyProvider',
        companyName: companyName,
        partners: [],
        customers: [],
        userId: companyName + Math.floor(Math.random() * 100).toString(),
        email: companyEmail,
        role: 'Provider',
        tokens: [],
        conversionRate: ConversionRate,
      };

      console.log(this.provider);

      if (companyName && companyEmail && companyName !== '') {
      this.loyaltyProviderService.addProvider(this.provider)
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

      if (companyName === '') {
      this.router.navigateByUrl('loyalty-provider/add');
      this.validName = false;
      }
  }

  goBack(): void {
    this.location.back();
  }

}
