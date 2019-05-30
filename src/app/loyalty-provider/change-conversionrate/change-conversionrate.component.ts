import { Component, OnInit } from '@angular/core';
import { LoyaltyproviderService } from 'src/app/services/loyaltyprovider.service';
import { LoyaltyProvider } from 'src/app/models/loyaltynetwork';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-change-conversionrate',
  templateUrl: './change-conversionrate.component.html',
  styleUrls: ['./change-conversionrate.component.css']
})
export class ChangeConversionrateComponent implements OnInit {
  signedInProvider: LoyaltyProvider;
  providerId: string;
  errorMessage: string;

  constructor(private loyaltyProviderService: LoyaltyproviderService, private route: ActivatedRoute, 
              private router: Router, private location: Location, private sessionService: SessionService) {
  }

  ngOnInit() {
    this.sessionService.getSignedInUser("minimal")
    .then(result => {
      this.signedInProvider = result;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  onSubmit(): void {
    console.log(this.signedInProvider);
    this.loyaltyProviderService.updateProvider(this.signedInProvider)
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
