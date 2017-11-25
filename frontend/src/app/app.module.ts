import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ImagesComponent } from './images/images.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatGridListModule } from '@angular/material';
import { MatInputModule, MatButtonModule, MatCardModule, MatMenuModule,  } from '@angular/material';

import {HttpClientModule} from '@angular/common/http';
import { ImagesService } from './images.service';
import { AuthenticationService } from './authentication.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    ImagesComponent,
    RegisterComponent,
    LoginComponent
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
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ImagesService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
