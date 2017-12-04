import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Collection } from './collection';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { DmcaRequest } from './dmca-request';

// Service to communicate with DMCA API
@Injectable()
export class DmcaService {

  apiUrl = '/api';
  dmcaRequestUrl = '/dmca';

  constructor(private http: HttpClient) { }

  getRequests(): Observable<DmcaRequest[]> {
    return (this.http.get<DmcaRequest[]>(this.apiUrl + this.dmcaRequestUrl));
  }

  updateRequest(request: DmcaRequest) {
    return (this.http.put(this.apiUrl + this.dmcaRequestUrl + '/' + request._id, request));
  }

  handleError(operation = 'operation', result?) {
    return (error: any) => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }

  log(message: string) {
    console.log('DMCA Service: ' + message);
  }


}
