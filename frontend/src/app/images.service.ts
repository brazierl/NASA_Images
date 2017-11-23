import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ImagesService {

  result: any;
  imagesUrl: string;

  constructor(private http: Http) {
    this.imagesUrl = '/api/images';
   }

  getImages() {
    return (this.http.get(this.imagesUrl).map(result => this.result = result.json().collection.items));
  }

  getImagesSearch(q: string) {
    return (this.http.get(this.imagesUrl + '?' + 'q=' + encodeURIComponent(q)).map(result => this.result = result.json().collection.items));
  }

}
