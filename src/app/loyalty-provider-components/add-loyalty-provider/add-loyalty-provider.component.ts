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
  providerModel = new LoyaltyProvider();
  validName: boolean = true;
  validType: boolean = true;

  constructor(private router: Router, private location: Location, private route: ActivatedRoute, private loyaltyProviderService: LoyaltyproviderService) { }

  ngOnInit() {
   
  }

  onSubmit(companyName, email): void {
      this.providerModel.userId = name + Math.floor(Math.random() * 100).toString();
      this.providerModel.role = "Provider";
      this.providerModel.email = email;
      this.providerModel.companyName = companyName;
      this.providerModel.partners = [];
      this.providerModel.customers = [];
      this.providerModel.tokens = [];
      
    if (name && email && name != '') {
      this.loyaltyProviderService.addProvider(this.providerModel);
      this.router.navigateByUrl('loyalty-provider');
    }

    if (name == '') {
      this.router.navigateByUrl('loyalty-provider/add');
      this.validName = false;
    }

  }

  goBack(): void {
    this.location.back();
  }

}
