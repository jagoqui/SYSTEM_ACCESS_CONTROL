import { UserLoginInterface } from '@models/user-login';
import { AuthService } from '@auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AuthService],
})
export class ProfileComponent implements OnInit {
  userLogin: UserLoginInterface = {
    name: '',
    email: '',
    photo_url: ''
  };
  public providerId = 'null'; // Comprueba con metodo de logueo se inició
  // tslint:disable-next-line:max-line-length
  // public user$: Observable<UserLoginInterface> = this.authSvc.isAuth(); // Le pasa los datos del servicio Auth y verifica si el usuario está logueado
  constructor(private authSvc: AuthService, private router: Router) { }
  ngOnInit() {
    this.authSvc.isAuth().subscribe(user => {
      try { // TODO: Reparar error de imagne de perfil, no siempre se muestra
        this.userLogin = user;
        this.userLogin.name = user.displayName;
        this.userLogin.email = user.email;
        this.userLogin.photo_url = user.photoURL;
        this.providerId = user.providerData[0].providerId;
      } catch (error) { }
    });
  }
}
