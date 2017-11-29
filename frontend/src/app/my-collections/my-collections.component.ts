import { Component, OnInit } from '@angular/core';
import { CollectionsService } from '../collections.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-my-collections',
  templateUrl: './my-collections.component.html',
  styleUrls: ['./my-collections.component.css']
})
export class MyCollectionsComponent implements OnInit {
  collections: any;

  constructor(private collectionsService: CollectionsService, private authenticationService: AuthenticationService) {
    this.authenticationService.getUser().subscribe((user) => {
      this.collectionsService.getUserCollections(user.username).subscribe(
        (collections) => {
          this.collections = collections;
        },
        (err: HttpErrorResponse) => {
          this.handleError(err);
        }
      );
    });
  }

  ngOnInit() {
  }

  handleError(err: HttpErrorResponse) {
    return this.collectionsService.handleError('add-collection', []);
  }
}
