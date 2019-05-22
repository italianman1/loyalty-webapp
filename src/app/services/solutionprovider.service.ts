import { Injectable } from '@angular/core';
import { SolutionProvider } from '../models/loyaltynetwork';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolutionproviderService {
  private errorMessage: any;
  private category = 'SolutionProvider';

  constructor(private httpService: HttpService<SolutionProvider>) { }

  getAllSolutionProviders(): Observable<SolutionProvider[]> {
    return this.httpService.getAll(this.category);
  }

  getSolutionProvider(id: string, filter?: string): Observable<SolutionProvider> {
    return this.httpService.getSingleInstance(this.category, id, filter);
  }
  
  addSolutionProvider(instance: SolutionProvider): Observable<SolutionProvider> {
    return this.httpService.addSingleInstance(this.category, instance);
  }

  updateSolutionProvider(instance: SolutionProvider): Observable<SolutionProvider> {
    return this.httpService.updateSingleInstance(this.category, instance.userId, instance);
  }
  
  deleteSolutionProvider(id: string): Observable<SolutionProvider> {
    return this.httpService.deleteSingleInstance(this.category, id);
  }
}
