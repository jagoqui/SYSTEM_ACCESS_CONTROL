import { Component, OnInit } from '@angular/core';
import { DataApiService } from '@dataBase/services/data-api.service';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rf-id-receptor',
  templateUrl: './rf-id-receptor.component.html',
  styleUrls: ['./rf-id-receptor.component.scss']
})
export class RfIdReceptorComponent implements OnInit {
  RF_ID = new FormControl('');
  userId: string = null;
  constructor(private dataApi: DataApiService, private router: Router) { }
  searchDB(id: string) {
    this.dataApi.getOneUser(id).subscribe(returnUser => { // Le paso los items de la base de datos a la conexión
      try{
        this.userId = returnUser.rf_id;
        this.router.navigate(['/listUser', id]);
      }catch (error){
        this.router.navigate(['/createNewUser', id]);
      }
    });
  }
  doAction() {
    if (this.RF_ID.value !== '') {
      this.searchDB(this.RF_ID.value);
    } else {
      alert('Enter some value on input');
    }
  }
  ngOnInit(): void {
  }

}
