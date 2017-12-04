import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Service to communnicate with images API
@Injectable()
export class ImagesService {

  imagesUrl = '/api/remote-images';

  constructor(private http: HttpClient) { }

  getImages() {
    return (this.http.get(this.imagesUrl));
  }

  getImagesSearch(q: string) {
    return (this.http.get(this.imagesUrl + '?' + 'q=' + encodeURIComponent(q)));
  }

}
