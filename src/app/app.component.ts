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

  constructor() {
    
  }

  
}
