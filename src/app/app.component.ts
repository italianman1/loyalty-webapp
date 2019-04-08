import { Component, Type } from '@angular/core';
import { HttpService} from './services/http.service';
import { User } from './models/loyaltynetwork';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'loyalty-app';
  private errorMessage;
  allUsers: Array<User> = [];

  constructor(private httpService: HttpService) {
    this.getAllUsers();
  }

  getAllUsers(): Promise<any> {
    const tempList = [];
    return this.httpService.getAll('Customer')
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(user => {
        tempList.push(user);
      });
      this.allUsers = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

}
