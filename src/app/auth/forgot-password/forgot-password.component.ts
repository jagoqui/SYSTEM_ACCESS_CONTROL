import { AuthService } from '@auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [AuthService]
})
export class ForgotPasswordComponent implements OnInit {
  userEmail = new FormControl('');
  constructor(private authSvc: AuthService, private router: Router) { }
  async onReset() {
    console.log(this.userEmail.value);
    try {
      const email = this.userEmail.value;
      await this.authSvc.resetPassword(email);
      window.alert('Email sent, check your inbox!');
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(`Error in on reset password=>${error}`);
    }
  }
  setUserEmail(value: string){
    this.userEmail.setValue(value);
  }
  ngOnInit(): void {
  }

}
