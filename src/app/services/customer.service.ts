import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Customer } from '../models/loyaltynetwork';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private category = 'Customer';

  constructor(private httpService: HttpService<Customer>) { }

  getAllCustomers(): Observable<Customer[]> {
    return this.httpService.getAll(this.category);
  }

  getCustomer(id: string): Observable<Customer> {
    return this.httpService.getSingleInstance(this.category, id);
  }
  
  addCustomer(instance: Customer): Observable<Customer> {
    return this.httpService.addSingleInstance(this.category, instance);
  }

  updateCustomer(instance: Customer): Observable<Customer> {
    return this.httpService.updateSingleInstance(this.category, instance.userId, instance);
  }
  deleteCustomer(id: string): Observable<Customer> {
    return this.httpService.deleteSingleInstance(this.category, id);
  }
}
