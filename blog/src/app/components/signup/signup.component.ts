import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  handling = false;
  form: FormGroup;


  createForm() {
    this.form = this.formBuilder.group(
      {
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(5),
            Validators.maxLength(30)
          ])
        ],
        username: ['',
         Validators.compose([
           Validators.required,
           Validators.minLength(5),
           Validators.maxLength(15)
         ])],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(35)
          ])
        ],
        confirm: ['', Validators.required]
      },
      { validator: this.matchingPasswords('password', 'confirm') }
    );
  }

  disableForm() {
    this.form.controls['email'].disable();
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirm'].disable();
  }

  enableForm() {
    this.form.controls['email'].enable();
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();
  }

  onSignUp() {
    this.handling = true;
    this.disableForm();
    const user = {
      email: this.form.get('email').value,
      username: this.form.get('username').value,
      password: this.form.get('password').value
    };

    this.authService.register(user).subscribe(data => {
      if (!data.success) {
        this.snackBar.open(data.message, '', {duration: 3000});
        this.handling = false;
        this.enableForm();
      } else {
        this.snackBar.open(data.message, '', {duration: 3000});
        setTimeout(() => this.router.navigate(['/login']), 1000);
      }
    });
  }

  getEmailErrorMessage() {
    return this.form.controls.email.hasError('required')
      ? 'You must enter a value'
      : this.form.controls.email.hasError('email')
        ? 'Not a valid email'
        : this.form.controls.email.hasError('length')
          ? 'Has to be longer than 5'
          : '';
  }

  getErrorMessage() {
    return this.form.controls.username.hasError('required')
      ? 'You must enter a value between 8 and 30 characters'
      : '';
  }

  

  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      if (group.controls[password].value == group.controls[confirm].value) {
        return null;
      } else {
        return { 'matchingPasswords': true };
      }
    };
  }

  // matchingPasswords(ac: AbstractControl){
  //   let password = ac.get('password').value;
  //   let confirm = ac.get('confirm').value;
  //   if (password != confirm) {
  //     console.log('false');
  //     ac.get('confirm').setErrors({ matchingPasswords: true});
  //   } else {
  //     console.log('true');
  //     return null;
  //   }
  // }

  checkEmail() {
    const email = this.form.get('email').value;
    this.authService.checkEmail(email).subscribe(data => {
      if (!data.success) {
        this.snackBar.open(data.message, '', {duration: 3000})
      } else {
        this.snackBar.open(data.message, '', {duration: 3000})
      }
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.createForm();
  }
}
