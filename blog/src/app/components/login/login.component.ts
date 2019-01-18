import { AuthGuard } from './../../guards/auth.guard';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  handling = false;
  form: FormGroup;
  
  previousUrl;
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private authGuard: AuthGuard, public snackBar: MatSnackBar) { }
  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  disableForm() {
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
  }

  enableForm() {
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
  }

  onLogin() {
    this.handling = true;
    this.disableForm();
    const user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    };
    this.authService.login(user).subscribe(data => {
      if (!data.success) {
        this.snackBar.open(data.message, '', {duration: 3000});
        this.handling = false;
        this.enableForm();
      } else {
        this.snackBar.open(data.message, '', {duration: 3000});
        this.authService.storeUserData(data.token, data.user);
        setTimeout(() => {
          if (this.previousUrl) {
            this.router.navigate([this.previousUrl]);
          } else {
          this.router.navigate(['/dashboard']);
          }
        }, 1000);
      }
    });
  }


  ngOnInit() {
    if (this.authGuard.redirectUrl) {
      this.snackBar.open('You must be logged in!', '', {duration: 3000});
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }
    this.createForm();
  }

}
