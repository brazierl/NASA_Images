import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Collection } from './collection';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CollectionsService {

  collectionUrl = '/api/collections';

  constructor(private http: HttpClient) { }

  saveCollection(collection: Collection) {
    return (this.http.post(this.collectionUrl, collection));
  }

  getPublicCollections() {
    return (this.http.get(this.collectionUrl));
  }

  updateCollection(collectionId, collection: Collection) {
    return (this.http.put(this.collectionUrl + '/' + collectionId, collection));
  }

  handleError (operation = 'operation', result?) {
    return (error: any) => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }

  log(message: string) {
    console.log('Collection Service: ' + message);
  }

}
