import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import { BlogService } from './services/blog.service';
import { UnAuthGuard } from './guards/unAuth.guard';
import { AuthGuard } from './guards/auth.guard';
import { AppRoutingModule } from './app-routing-module';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import {
  FlashMessagesModule,
  FlashMessagesService
} from 'angular2-flash-messages';
import { BlogComponent } from './components/blog/blog.component';
import { DeleteBlogComponent } from './components/delete-blog/delete-blog.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';


@NgModule({
  declarations: [
  AppComponent,
  NavbarComponent,
  HomeComponent,
  DashboardComponent,
  SignupComponent,
  LoginComponent,
  ProfileComponent,
  BlogComponent,
  EditBlogComponent,
  DeleteBlogComponent,
  PublicProfileComponent
  ],
  imports: [
  BrowserModule,
  HttpModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
  AppRoutingModule,
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatSnackBarModule,
  BrowserAnimationsModule,
  FlashMessagesModule
  ],
  providers: [AuthService, FlashMessagesService, AuthGuard, UnAuthGuard, BlogService],
  bootstrap: [AppComponent]
  })
export class AppModule {}
