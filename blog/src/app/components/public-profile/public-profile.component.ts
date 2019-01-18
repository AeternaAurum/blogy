import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
  })
export class PublicProfileComponent implements OnInit {
  url;
  username;
  email;
  
  isProfileFound = false;


  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.url = this.activatedRoute.snapshot.params;
    this.authService.getPublicProfile(this.url.username).subscribe(data => {
      if (!data.success) {
        this.snackBar.open(data.message, '', {duration: 3000})
      } else {
        this.username = data.user.username;
        this.email = data.user.email;
      }
    });
  }
}
