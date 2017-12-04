import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { CollectionsService } from '../collections.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Collection } from '../collection';

@Component({
  selector: 'app-collection-add',
  templateUrl: './collection-add.component.html',
  styleUrls: ['./collection-add.component.css']
})
export class CollectionAddComponent implements OnInit {
  private error: string;
  private success: boolean;

  user = this.authenticationService.getUser();

  constructor(private collectionsService: CollectionsService,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  onSubmit(addForm: NgForm) {
    if (addForm.valid) {
      this.user.subscribe((user: User) => {
        if (user._id) {
          const collection = new Collection();
          collection.description = addForm.value.description;
          collection.name = addForm.value.name;
          collection.visibility = addForm.value.visibility;
          collection.user = user;
          this.collectionsService.saveCollection(collection)
            .subscribe(
            (data) => {
              this.success = true;
              addForm.reset();
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
    this.error = 'Fail to save collection: ' + err.message;
    return this.collectionsService.handleError('add-collection', []);
  }
}
