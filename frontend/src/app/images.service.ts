import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ImagesService {

  result: any;
  imagesUrl: string;

  constructor(private http: HttpClient) {
    this.imagesUrl = '/api/images';
   }

  getImages() {
    return (this.http.get(this.imagesUrl));
  }

  getImagesSearch(q: string) {
    return (this.http.get(this.imagesUrl + '?' + 'q=' + encodeURIComponent(q)));
  }

}
