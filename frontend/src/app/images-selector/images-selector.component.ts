import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { ImagesService } from '../images.service';
import { Image } from '../image';
import { CollectionsService } from '../collections.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-images-selector',
  templateUrl: './images-selector.component.html',
  styleUrls: ['./images-selector.component.css']
})
export class ImagesSelectorComponent implements OnInit {

  private error: string;
  private success: boolean;

  images: any;
  query: string;
  selectedImages: any[];

  constructor(public dialogRef: MatDialogRef<ImagesSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private imagesService: ImagesService,
    private collectionsService: CollectionsService) {
    imagesService.getImages().subscribe(res => this.images = res['collection']['items']);
    this.selectedImages = [];
  }

  searchButton(searchInput) {
    this.query = searchInput.value;
    this.imagesService.getImagesSearch(this.query).subscribe(res => this.images = res['collection']['items']);
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addImage(image) {
    const img = new Image();
    img.url = image.links[0].href;
    img.title = image.data[0].title;
    img.description = image.data[0].description;
    img.image_collection = this.data.collection;

    const index = this.selectedImages.findIndex(i => i.url === img.url);
    if (index > -1) {
      this.selectedImages.splice(index, 1);
    } else {
      this.selectedImages.push(img);
    }
  }

  isSelected(url) {
    return this.selectedImages.findIndex(i => i.url === url) > -1;
  }

  unselectImage(img) {
    const index = this.selectedImages.findIndex(i => i.url === img.url);
    if (index > -1) {
      this.selectedImages.splice(index, 1);
    }
  }

  addToCollection() {
    this.error = null;
    if (this.selectedImages.length > 0) {
      for (let i = 0; i < this.selectedImages.length; i++) {
        const img = this.selectedImages[i];
        console.log(img.image_collection);
        console.log(this.data.collection._id);
        this.collectionsService.addImage(this.data.collection._id, img).subscribe(
          (data) => {
            this.success = true;
          },
          (err: HttpErrorResponse) => {
            this.handleError(err);
          });
      }
    } else {
      this.error = 'You have to select at least one image.';
    }
  }

  handleError(err: HttpErrorResponse) {
    this.error = ' failed: ' + err.message;
    return this.collectionsService.handleError('add-image', []);
  }

}
