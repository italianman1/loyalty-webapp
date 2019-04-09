import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { User, LoyaltyProvider } from '../models/loyaltynetwork';

@Component({
  selector: 'app-loyalty-providers',
  templateUrl: './loyalty-providers.component.html',
  styleUrls: ['./loyalty-providers.component.css']
})
export class LoyaltyProvidersComponent implements OnInit {
  private errorMessage;
  allProviders: Array<LoyaltyProvider> = [];

  constructor(private httpService: HttpService) { 
    this.getAllProviders();
  }

  ngOnInit() {
  }

  async getAllProviders(): Promise<any> {
    const tempList = [];
    try {
      const result = await this.httpService.getAll('LoyaltyProvider')
        .toPromise();
      this.errorMessage = null;
      result.forEach(user => {
        tempList.push(user);
      });
      this.allProviders = tempList;
    }
    catch (error) {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      }
      else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    }
  }


}
