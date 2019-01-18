import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  onLogout() {
    this.authService.logout();
    this.snackBar.open('You are logged out', '', {duration: 3000});
    this.router.navigate(['/']);
  }
  ngOnInit() {}
}
