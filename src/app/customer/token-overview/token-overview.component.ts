import { Component, OnInit } from '@angular/core';
import { PointsData } from 'src/app/models/chart-data.model';
import { QueryService } from 'src/app/services/query.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LoyaltyproviderService } from 'src/app/services/loyaltyprovider.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-token-overview',
  templateUrl: './token-overview.component.html',
  styleUrls: ['./token-overview.component.css']
})
export class TokenOverviewComponent implements OnInit {
  private pointsEarnedData: PointsData[] = [];
  private pointsSpentData: PointsData[] = [];
  private signedInCustomer;

  constructor(private queryService: QueryService, private customerService: CustomerService,
              private loyaltyProviderService: LoyaltyproviderService, private tokenService: TokenService) { }

  ngOnInit() {
    this.getCustomer();
    const data: PointsData = {provider: 'Praxis', points: 100, euros: 200};
    const data2: PointsData = {provider: 'Gamma', points: 100, euros: 150};
    const data3: PointsData = {provider: 'Maxeda', points: 50, euros: 50};
    const data4: PointsData = {provider: 'whazaaa', points: 80, euros: 160};
    this.pointsEarnedData.push(data);
    this.pointsSpentData.push(data2);
    this.pointsSpentData.push(data3);
    this.pointsSpentData.push(data4);
  }

  getCustomer() {
    this.customerService.getCustomer('Henk1')
    .toPromise()
    .then(customer => {
      this.signedInCustomer = customer;
      //this.getPointsSpentData();
      this.getPointsEarnedData();
    });
  }

  getPointsSpentData() {
    this.signedInCustomer.providers.forEach(providerResourceId => {
      let data: PointsData = {provider: '', points: 0, euros: 0};
      const providerId: string = providerResourceId;
      this.loyaltyProviderService.getProvider(providerId.split('#')[1])
      .toPromise()
      .then(provider => {
        data.provider = provider.companyName;
        this.queryService.selectAllRedeemedTokenTransactions(this.signedInCustomer.userId, provider.userId)
        .toPromise()
        .then(redeemTokens => {
          redeemTokens.forEach(transaction => {
            data.points += transaction.redeemdedTokens;
          });
          data.euros = data.points / provider.conversionRate;
        });
      });
      this.pointsSpentData.push(data);
    });

    console.log(this.pointsSpentData);
  }

  getPointsEarnedData() {
    this.signedInCustomer.tokens.forEach(tokenId => {
      this.tokenService.getToken(tokenId.split('#')[1])
      .toPromise()
      .then(token => {
        if (this.pointsEarnedData.length == 0) {
          let data: PointsData = {provider: '', points: 0, euros: 0};
          this.loyaltyProviderService.getProvider(token.issuer.split('#')[1])
          .toPromise()
          .then(provider => {
            data.provider = provider.companyName;
            data.points = 1;
            data.euros = data.points / provider.conversionRate;
            this.pointsEarnedData.push(data);
          });
        }

        if (this.pointsEarnedData.length > 0) {
          this.loyaltyProviderService.getProvider(token.issuer.split('#')[1])
          .toPromise()
          .then(provider => {
            console.log(provider);
            let found = false;
            this.pointsEarnedData.forEach(data => {
              if(data.provider == provider.companyName) {
                data.points += 1;
                data.euros = data.points / provider.conversionRate;
                found = true;
              }});

            if (!found) {
              let data: PointsData = {provider: provider.companyName, points: 1, euros: 0};
              data.euros = data.points / provider.conversionRate;
              console.log(data.points);
              console.log(provider.conversionRate);
              this.pointsEarnedData.push(data);
            }
          });
         }
      });
    });
  }
}
