import { Component, OnInit } from '@angular/core';
import {ImagesService} from '../images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  images: any;
  query: string;

  constructor(private imagesService: ImagesService) {
    imagesService.getImages().subscribe(res => this.images = res['collection']['items']);
  }

  searchButton(searchInput) {
    this.query = searchInput.value;
    this.imagesService.getImagesSearch(this.query).subscribe(res => this.images = res['collection']['items']);
  }

  ngOnInit() {
  }

}
