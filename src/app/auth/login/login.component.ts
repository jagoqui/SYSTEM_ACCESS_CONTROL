import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void { }

  async onLoginEmailUser() {
    const { email, password } = this.loginForm.value;
    try {
      const user = await this.authSvc.loginEmailUser(email, password);
      if (user && user.user.emailVerified) {
        this.router.navigate(['/home']);
      } else if (user) {
        this.router.navigate(['/verification-email']);
      } else {
        this.router.navigate(['/register']);
      }
    } catch (error) {
      console.log(error);
    }
  }
  onLoginGoogleUser(): void {
    this.authSvc.loginGoogleUser()
      .then((answer) => {
        this.router.navigate(['/home']);
      }).catch(err => console.log(`Error opening user google!=>${err.message}`));
  }
}
