import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { DeleteBlogComponent } from './components/delete-blog/delete-blog.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import { BlogComponent } from './components/blog/blog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnAuthGuard } from './guards/unAuth.guard';

import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'blog', component: BlogComponent, canActivate: [AuthGuard]},
  { path: 'edit-blog/:id', component: EditBlogComponent, canActivate: [AuthGuard]},
  { path: 'delete-blog/:id', component: DeleteBlogComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'signup', component: SignupComponent, canActivate: [UnAuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [UnAuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'user/:username', component: PublicProfileComponent, canActivate: [AuthGuard]},
  { path: '**', component: HomeComponent},
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
