import { Component, OnInit } from '@angular/core';
import { DataApiService } from '@dataBase/services/data-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private dataApi: DataApiService) { }
  public Users = [];
  public User = '';
  ngOnInit(): void {
    this.dataApi.getAllUsers().subscribe(Users => {
      console.log('Users', Users);
    });
  }

}
