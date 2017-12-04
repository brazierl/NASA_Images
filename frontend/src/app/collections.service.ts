import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Collection } from './collection';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Image } from './image';

// Service to communicate with collection API
@Injectable()
export class CollectionsService {

  apiUrl = '/api';
  collectionUrl = '/collections';
  imagesUrl = '/images';
  userUrl = '/user';

  constructor(private http: HttpClient) { }

  saveCollection(collection: Collection) {
    return (this.http.post(this.apiUrl + this.collectionUrl, collection));
  }

  getPublicCollections(): Observable<Collection[]> {
    return (this.http.get<Collection[]>(this.apiUrl + this.collectionUrl));
  }

  getUserCollections(username): Observable<Collection[]> {
    return (this.http.get<Collection[]>(this.apiUrl + this.collectionUrl + this.userUrl + '/' + username));
  }

  updateCollection(collectionId, collection: Collection) {
    return (this.http.put(this.apiUrl + this.collectionUrl + '/' + collectionId, collection));
  }

  getCollection(collectionId): Observable<Collection> {
    return (this.http.get<Collection>(this.apiUrl + this.collectionUrl + '/' + collectionId));
  }

  getImages(collectionId): Observable<Image> {
    return (this.http.get<Image>(this.apiUrl + this.imagesUrl + this.collectionUrl + '/' + collectionId));
  }

  addImage(collectionId, image) {
    return (this.http.post(this.apiUrl + this.imagesUrl + this.collectionUrl + '/' + collectionId, image));
  }

  deleteImage(collectionId, imageId) {
    return (this.http.delete(this.apiUrl + this.imagesUrl + '/' + imageId));
  }

  deleteCollection(collectionId) {
    return (this.http.delete(this.apiUrl + this.collectionUrl + '/' + collectionId));
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
    console.log('Collection Service: ' + message);
  }

}
