import { Component, OnInit } from '@angular/core';
import {ImagesService} from '../images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  images: any;

  constructor(private imagesService: ImagesService) {
    imagesService.getImages().subscribe(res => this.images = res);
  }

  searchButton(searchInput) {
    this.imagesService.getImagesSearch(searchInput.value).subscribe(res => this.images = res);
  }

  ngOnInit() {
  }

}
