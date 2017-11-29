import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { CollectionsService } from '../collections.service';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Collection } from '../collection';
import 'rxjs/add/operator/switchMap';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ImagesSelectorComponent } from '../images-selector/images-selector.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Observable } from 'rxjs/Observable';
import { Image } from '../image';

@Component({
  selector: 'app-collection-update',
  templateUrl: './collection-update.component.html',
  styleUrls: ['./collection-update.component.css']
})
export class CollectionUpdateComponent implements OnInit {

  private error: string;
  private success: boolean;

  user$ = this.authenticationService.getUser();
  collection;
  images$: Observable<Image>;

  constructor(private collectionsService: CollectionsService,
    private authenticationService: AuthenticationService,
    private router: Router, private route: ActivatedRoute,
    public dialog: MatDialog) { }

  onSubmit(editForm: NgForm) {
    if (editForm.valid) {
      this.user$.subscribe((user: User) => {
        if (user._id) {
          this.collectionsService.updateCollection(this.collection._id, this.collection)
            .subscribe(
            (data) => {
              this.success = true;
            },
            (err: HttpErrorResponse) => {
              this.handleError(err);
            }
            );
        } else {
          this.error = 'User should be logged in!';
        }
      });
    } else {
      this.error = 'The form is not valid!';
    }
  }

  ngOnInit() {
    this.route.paramMap
    .switchMap(
    (params: ParamMap) => this.collectionsService.getCollection(params.get('id'))
    )
    .subscribe(
    (collection) => {
      if (collection) {
        this.collection = collection;
        this.images$ = this.collectionsService.getImages(collection['_id']);
      }
    },
    (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  handleError(err: HttpErrorResponse) {
    this.error = 'Fail to edit collection: ' + err.message;
    return this.collectionsService.handleError('update-image', []);
  }

  openImagesSelector(): void {
    const dialogRef = this.dialog.open(ImagesSelectorComponent, {
      height: '70%',
      width: '70%',
      data: { collection: this.collection }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteCollection() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete collection',
        message: 'Are you sure you want to delete collection "' + this.collection.name + '"?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.collectionsService.deleteCollection(this.collection._id).subscribe(
          (data) => {
            this.router.navigate(['collections']);
          },
          (err: HttpErrorResponse) => {
            this.handleError(err);
          });
      }
    });
  }

  deleteImage(image) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete image',
        message: 'Are you sure you want to delete image "' + image.title + '"?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.collectionsService.deleteImage(this.collection._id, image._id).subscribe(
          (data) => {
            this.images$ = this.collectionsService.getImages(this.collection._id);
          },
          (err: HttpErrorResponse) => {
            this.handleError(err);
          });
      }
    });
  }

}
