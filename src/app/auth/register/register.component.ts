import { Component, OnInit, ElementRef, ViewChild, Renderer2} from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  registerForm: FormGroup;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  @ViewChild('imageUser') imageUser: ElementRef;
  constructor(private authSvc: AuthService, private router: Router, private storage: AngularFireStorage, private renderer: Renderer2) { }
  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(15), Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]), // TODO :Validar tipo ce contraseña
      passwordVerification: new FormControl('', [Validators.required])
    });
  }
  onUpload(e) {
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }
  async onRegister() {
    const { email, password } = this.registerForm.value;
    try {
      const user = await this.authSvc.registerUser(email, password);
      if (user) {
        user.user.updateProfile({
          displayName: 'TEST', // TODO: Asignar nombre a usuario logueado por email
          photoURL: this.renderer.selectRootElement(this.imageUser.nativeElement).value
        }).then(() => {
          this.router.navigate(['/verification-email']);
        }).catch((error) => console.log(`Error in update user profile${error}`));
      }
    } catch (error) {
      console.log(`Error in onRegister!=>${error}`);
    }
    if (this.authSvc.get_resetForm()){
      this.registerForm.reset();
    }
  }
  onLoginGoogleUser(): void {
    this.authSvc.loginGoogleUser()
      .then((answer) => {
        this.router.navigate(['/home']);
      }).catch(err => console.log(`Error opening user google!=>${err.message}`));
  }
  ngOnInit(): void {
    this.registerForm = this.createFormGroup();
  }
}
