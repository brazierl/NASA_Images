import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { CollectionsService } from '../collections.service';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Collection } from '../collection';
import 'rxjs/add/operator/switchMap';

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

  constructor(private collectionsService: CollectionsService,
    private authenticationService: AuthenticationService,
    private router: Router, private route: ActivatedRoute) {
    this.route.paramMap
      .switchMap(
      (params: ParamMap) => this.collectionsService.getCollection(params.get('id'))
      )
      .subscribe(
      (collection) => this.collection = collection
      );
  }

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
  }

  handleError(err: HttpErrorResponse) {
    this.error = 'Registration failed: ' + err.message;
    return this.collectionsService.handleError('register', []);
  }

}
