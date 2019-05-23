import { Component, OnInit } from '@angular/core';
import { PointsData } from 'src/app/models/chart-data.model';
import { QueryService } from 'src/app/services/query.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LoyaltyproviderService } from 'src/app/services/loyaltyprovider.service';
import { TokenService } from 'src/app/services/token.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-token-overview',
  templateUrl: './token-overview.component.html',
  styleUrls: ['./token-overview.component.css']
})
export class TokenOverviewComponent implements OnInit {
  private pointsEarnedData: PointsData[] = [];
  private pointsSpentData: PointsData[] = [];
  private signedInCustomer;

  constructor(private queryService: QueryService, private sessionService: SessionService) { }

  ngOnInit() {
    this.getUser();
 
  }

  getUser() {
    this.sessionService.getSignedInUser()
    .then(user => {
      this.signedInCustomer = user;
      this.getPointsEarnedData();
      console.log(this.pointsEarnedData, this.signedInCustomer);
    });
  }

  getPointsSpentData() {
    this.signedInCustomer.providers.forEach(provider => {
      let data: PointsData = {provider: '', points: 0, euros: 0};
      data.provider = provider.companyName;
      this.queryService.selectAllRedeemedTokenTransactions(this.signedInCustomer.userId, provider.userId)
        .toPromise()
        .then(redeemTokens => {
          redeemTokens.forEach(transaction => {
            data.points += transaction.redeemdedTokens;
          });
          data.euros = data.points / provider.conversionRate;
        });
      this.pointsSpentData.push(data);
      });
  }

  getPointsEarnedData() {
    this.signedInCustomer.tokens.forEach(token => {
      if (this.pointsEarnedData.length == 0) {
        let data: PointsData = {provider: '', points: 0, euros: 0};
        data.provider = token.issuer.companyName;
        data.points = 0;
        data.euros = data.points / token.issuer.conversionRate;
        this.pointsEarnedData.push(data);
        console.log(data);
      }

      if (this.pointsEarnedData.length > 0) {
          let found = false;
          this.pointsEarnedData.forEach(data => {
            if(data.provider == token.issuer.companyName) {
              data.points += 1;
              data.euros = data.points / token.issuer.conversionRate;
              found = true;
              return;
            }});

          if (!found) {
            let data: PointsData = {provider: token.issuer.companyName, points: 1, euros: 0};
            data.euros = data.points / token.issuer.conversionRate;
            console.log(data.points);
            console.log(token.issuer.conversionRate);
            this.pointsEarnedData.push(data);
          }
      }
    });
  }
}
