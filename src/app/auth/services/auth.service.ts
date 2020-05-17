import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public user$: Observable<any> = this.afAuth.user; // Usuario logueado
  resetForm = false;
  constructor(public afAuth: AngularFireAuth) { }
  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(`Error in reset password!=>${error}`);
    }
  }

  async loginEmailUser(email: string, password: string) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
    }catch (error){
      console.log(`Error in login!=>${error}`);
    }
  }

  async registerUser(email: string, password: string) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
    }catch (error){
      alert(error);
      this.resetForm = true;
    }
  }

  async logoutUser() {
    try {
      await this.afAuth.signOut();
    }catch (error){
      console.log(`Error in logout=>${error}`);
    }
  }
  async loginGoogleUser(){
    try {
      return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    }catch (error){
      console.log(`Error opening popup googgle!=>${error}`);
    }
  }
  isAuth() {
    return this.afAuth.authState.pipe(map(auths => auths));
  }
  get_resetForm(){
    return this.resetForm;
  }
}
