import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {UserAccessIterface} from '@models/user-access';
import { DataApiService } from '@dataBase/services/data-api.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
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
  constructor(private dataApi: DataApiService, private router: Router, private route: ActivatedRoute) { }

  onDeleteUser(): void {
    const confirmation = confirm('Are you sure?. Data user can´t will recovered');
    if (confirmation) {
      this.dataApi.deleteUser(this.userView.rf_id);
      this.router.navigate(['/rf-id-receptor']);
    }
  }
  onUpdateUser(): void {
    this.router.navigate(['/createNewUser', this.userView.rf_id]);
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('rf_id');
    console.log('User ' + id + ' found');
    this.dataApi.getOneUser(id).subscribe(user => {
      if (user) {
        this.userView = user;
        console.log('UserView :>', user.model_reference);
      }
    });
  }

}
