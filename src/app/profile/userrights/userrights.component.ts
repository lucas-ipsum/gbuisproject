import { Component, OnInit } from '@angular/core';
import { FilterUserPipe } from 'src/app/pipes/filter-user.pipe';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-userrights',
  templateUrl: './userrights.component.html',
  styleUrls: ['./userrights.component.scss'],
  providers: [FilterUserPipe]
})
export class UserrightsComponent implements OnInit {
  allUser: any;
  activeRole = 'All'

  constructor(private userApi: ApiService, public filterUserP: FilterUserPipe) { }

  ngOnInit(): void {
    this.userApi.GetUser().subscribe(users => {
      this.allUser = users
    })
  }

  changeRole(user: any, role: string) {
    if (user.rolle !== role) {
      const newRole = {
        rolle: role
      }
      this.userApi.UpdateUser(user.username, newRole)
      this.userApi.GetUser().subscribe(users => this.allUser = users)
    } else {
      const removeRole = {
        rolle: 'none'
      }
      this.userApi.UpdateUser(user.username, removeRole)
      this.userApi.GetUser().subscribe(users => this.allUser = users)
    }
  }
}
