import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from 'firebase';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
  providers: [AuthService],
})
export class SendEmailComponent {
  public user$: Observable<User> = this.authSvc.afAuth.user;
  constructor(private authSvc: AuthService) { }
  onSendEmail(): void {
    this.authSvc.sendVerificationEmail();
  }
}
