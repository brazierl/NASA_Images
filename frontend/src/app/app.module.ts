import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ImagesComponent } from './images/images.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatGridListModule, MatSelectModule, MatDialogModule } from '@angular/material';
import { MatInputModule, MatButtonModule, MatCardModule, MatMenuModule, MatListModule, MatFormFieldControl } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';

import { HttpClientModule } from '@angular/common/http';

import { ImagesService } from './images.service';
import { AuthenticationService } from './authentication.service';
import { CollectionsService } from './collections.service';
import { DmcaService } from './dmca.service';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionAddComponent } from './collection-add/collection-add.component';
import { CollectionUpdateComponent } from './collection-update/collection-update.component';

import { AuthenticationGuard } from './authentication-guard';
import { ImagesSelectorComponent } from './images-selector/images-selector.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MyCollectionsComponent } from './my-collections/my-collections.component';
import { AboutComponent } from './about/about.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AdminAuthenticationGuard } from './admin-authentication-guard';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ImagesComponent,
    RegisterComponent,
    LoginComponent,
    CollectionListComponent,
    CollectionAddComponent,
    CollectionUpdateComponent,
    ImagesSelectorComponent,
    ConfirmationDialogComponent,
    MyCollectionsComponent,
    AboutComponent,
    AdminViewComponent,
    ProfileComponent
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
    MatDialogModule,
    HttpClientModule,
    MatCheckboxModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ImagesService, AuthenticationService, CollectionsService, DmcaService, AuthenticationGuard, AdminAuthenticationGuard],
  bootstrap: [AppComponent],
  entryComponents: [ImagesSelectorComponent, ConfirmationDialogComponent]
})
export class AppModule { }
