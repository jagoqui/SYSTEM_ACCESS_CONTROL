import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { DataApiService } from '@dataBase/services/data-api.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { UserAccessIterface } from '@app/models/user-access';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.scss']
})
export class CreateNewUserComponent implements OnInit {
  newUserForm: FormGroup;
  messageError: string;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  messageTittle: string;
  buttonText: string;
  userView: UserAccessIterface = {
    rf_id: '',
    name: '',
    bonding_type: '',
    email: '',
    identification_document: '',
    vehicule_type: '',
    model_reference: '',
    description: '',
    photo_url: ''
  };
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(
    private dataApi: DataApiService, private storage: AngularFireStorage, private route: ActivatedRoute,
    private authSvc: AuthService, private router: Router) {
  }
  createFormGroupUser() {
    return new FormGroup({
      rf_id: new FormControl(this.userView.rf_id),
      name: new FormControl(this.userView.name, [Validators.required, Validators.minLength(10)]),
      bonding_type: new FormControl(this.userView.bonding_type, Validators.required),
      email: new FormControl(this.userView.email, [Validators.required, Validators.minLength(15), Validators.pattern(this.emailPattern)]),
      identification_document: new FormControl(this.userView.identification_document, [Validators.required, Validators.minLength(10)]),
      vehicule_type: new FormControl(this.userView.vehicule_type, Validators.required),
      model_reference: new FormControl(this.userView.model_reference, [Validators.required, Validators.minLength(5)]),
      description: new FormControl(this.userView.description, [Validators.required, Validators.minLength(20), Validators.maxLength(100)]),
      photo_url: new FormControl(this.userView.photo_url, [Validators.required])
    });
  }
  getFormValidationErrors(input: string) {
    Object.keys(this.newUserForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.newUserForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          if (key === input) {
            this.messageError = 'Data entry error: ' + (key + 'Data') + 'data input fail in ' + keyError.toLocaleUpperCase();
          }
        });
      }
    });
  }
  onUpload(event) {
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    try{
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
    }catch (error){
      console.log(`Error in load image${error}`);
    }
  }
  onSaveForm() {
    if (this.newUserForm.valid) {
      if (this.buttonText === 'ADD'){
        console.log('Save', this.newUserForm.value);
        this.dataApi.addUser(this.newUserForm.value);
        this.uploadPercent = null; // TODO: Reiciniar en cero la barra de porcentaje
      }else{
        this.dataApi.updateUser(this.newUserForm.value);
        this.router.navigate(['/listUser', this.userView.rf_id]);
      }
      this.newUserForm.reset();
    } else {
      console.log('Error in input data form');
    }
  }
  ngOnInit(): void {
    const id =  this.route.snapshot.paramMap.get('rf_id');
    this.dataApi.getOneUser(id).subscribe(user => {
      this.messageTittle = user ? 'UPDATE USER' : 'CREATE NEW USER';
      this.buttonText = user ? 'UPDATE' : 'ADD';
      if (user){
        this.userView = user;
        this.newUserForm = this.createFormGroupUser(); // TODO: Averiguar porque no pudo acceder a los datos del usuario,
                                                      // por fuera de este susbcribe
      }
    });
    this.newUserForm = this.createFormGroupUser();
  }
}
