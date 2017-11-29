import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ImagesComponent } from './images/images.component';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionAddComponent } from './collection-add/collection-add.component';
import { CollectionUpdateComponent } from './collection-update/collection-update.component';
import { AuthenticationGuard } from './authentication-guard';
import { MyCollectionsComponent } from './my-collections/my-collections.component';

const routes: Routes = [
  { path: '', redirectTo: '/collections', pathMatch: 'full' },
  { path: 'images', component: ImagesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'collections', component: CollectionListComponent },
  { path: 'collections/add', component: CollectionAddComponent, canActivate: [AuthenticationGuard] },
  { path: 'collections/:id', component: CollectionUpdateComponent },
  { path: 'collections/user/:id', component: MyCollectionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
