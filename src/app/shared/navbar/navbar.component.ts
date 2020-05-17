import { UserLoginInterface } from '@models/user-login';
import { Observable} from 'rxjs';
import { AuthService} from '@auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthService],
})
export class NavbarComponent implements OnInit{
  userLogin: UserLoginInterface = {
    name: '',
    email: '',
    photo_url: ''
  };
  public providerId = 'null'; // Comprueba con metodo de logueo se inició
  // tslint:disable-next-line:max-line-length
  public user$: Observable<UserLoginInterface> = this.authSvc.isAuth(); // Le pasa los datos del servicio Auth y verifica si el usuario está logueado
  constructor(public authSvc: AuthService, private router: Router) { }
  async onLogout() {
    try {
      await this.authSvc.logoutUser();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(`Error in navbar onLogout!=>${error}`);
    }
  }
  ngOnInit(){
    this.authSvc.isAuth().subscribe(user => {
      if (user){
        this.userLogin = user;
        this.userLogin.name = user.displayName;
        try{
          this.userLogin.email = user.email; // TODO: Reparar error de imagen de perfil, no siempre se muetra
        }catch (error){}
        this.userLogin.photo_url = user.photoURL;
        this.providerId = user.providerData[0].providerId;
      }
    });
  }
}
