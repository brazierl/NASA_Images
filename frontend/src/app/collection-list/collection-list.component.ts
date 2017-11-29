import { Component, OnInit } from '@angular/core';
import { CollectionsService } from '../collections.service';
import { Collection } from '../collection';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit {

  collections: any;

  constructor(private collectionsService: CollectionsService) {
    this.collectionsService.getPublicCollections().subscribe(
      (collections) => {
        this.collections = collections;
      },
      (err: HttpErrorResponse) => {
        this.handleError(err);
      }
    );
  }

  ngOnInit() {
  }

  handleError(err: HttpErrorResponse) {
    return this.collectionsService.handleError('add-collection', []);
  }

}
