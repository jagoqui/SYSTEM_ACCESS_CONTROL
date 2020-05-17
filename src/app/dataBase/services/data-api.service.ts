import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Para hacer mapeo entre valores
import {UserAccessIterface} from '@models/user-access';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  private UsersCollection: AngularFirestoreCollection<UserAccessIterface>; // Le paso los items que hay en Firenbase
  Users: Observable<UserAccessIterface[]>; // Observo los items
  private UserDoc: AngularFirestoreDocument<UserAccessIterface>; // Le paso los un item desde Firenbase
  User: Observable<UserAccessIterface>; // Observo el item
  constructor(private afs: AngularFirestore) { // Capturo todos los datos de FireStore
    this.UsersCollection = afs.collection<UserAccessIterface>('Users'); // Le paso a la colección de la app la colección almacena en la BD
    this.Users = this.UsersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as UserAccessIterface;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))); // Hace una captura del id y todo los dato de cada item de la coleccón.
  }
  public getOneUser(idUser: string){
    this.UserDoc = this.afs.doc<UserAccessIterface>(`Users/${idUser}`);
    return this.User = this.UserDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false){
        return null;
      }else{
        const User = action.payload.data() as UserAccessIterface;
        User.rf_id = action.payload.id;
        return User;
      }
    }));
  }
  getAllUsers() { // Devuelvo todos los usuarios almacenados en la BD
    this.UsersCollection = this.afs.collection<UserAccessIterface>('Users');
    return this.Users = this.UsersCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const User = action.payload.doc.data() as UserAccessIterface;
          User.rf_id = action.payload.doc.id;
          return User;
        });
      }));
  }
  addUser(NewUser: UserAccessIterface){
    this.UsersCollection.add(NewUser);
  }
  updateUser(user: UserAccessIterface): void{
    const idUser = user.rf_id;
    this.UserDoc = this.afs.doc<UserAccessIterface>(`Users/${idUser}`);
    this.UserDoc.update(user);
  }
  deleteUser(idUser: string): void{
    this.UserDoc = this.afs.doc<UserAccessIterface>(`Users/${idUser}`);
    this.UserDoc.delete();
  }
}

