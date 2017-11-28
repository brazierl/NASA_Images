import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ImagesService {

  imagesUrl = '/api/images';

  constructor(private http: HttpClient) { }

  getImages() {
    return (this.http.get(this.imagesUrl));
  }

  getImagesSearch(q: string) {
    return (this.http.get(this.imagesUrl + '?' + 'q=' + encodeURIComponent(q)));
  }

}
