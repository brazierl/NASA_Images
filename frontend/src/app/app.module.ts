import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ImagesComponent } from './images/images.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatGridListModule, MatSelectModule } from '@angular/material';
import { MatInputModule, MatButtonModule, MatCardModule, MatMenuModule, MatListModule } from '@angular/material';

import { HttpClientModule } from '@angular/common/http';

import { ImagesService } from './images.service';
import { AuthenticationService } from './authentication.service';
import { CollectionsService } from './collections.service';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionAddComponent } from './collection-add/collection-add.component';
import { CollectionUpdateComponent } from './collection-update/collection-update.component';

import { AuthenticationGuard } from './authentication-guard';

@NgModule({
  declarations: [
    AppComponent,
    ImagesComponent,
    RegisterComponent,
    LoginComponent,
    CollectionListComponent,
    CollectionAddComponent,
    CollectionUpdateComponent
  ],
  imports: [
    MatInputModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatSelectModule,
    MatListModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ImagesService, AuthenticationService, CollectionsService, AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
