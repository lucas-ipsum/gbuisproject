import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() hideSidebar: boolean = false;
  @Input() loginStatus: boolean;
  username: string;
  user: any;

  constructor(private userApi: ApiService) {
    const token = localStorage.getItem('token')
    if (token) {
      this.userApi.getLoggedInUser().subscribe(
        data => {
          this.username = data.toString()
          this.userApi.GetUserByName(this.username).subscribe(val => { this.user = val })
        },
        error => console.log(error, 'notworking')
      )
    }
  }

  ngOnInit(): void {}

}
