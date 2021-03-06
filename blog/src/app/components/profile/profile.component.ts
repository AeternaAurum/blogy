import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username;
  email;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      this.username = data.user.username;
      this.email = data.user.email;
    });
  }

}
