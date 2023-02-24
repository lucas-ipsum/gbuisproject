import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../login/helpers/must-match.validator';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string;
  activePage: string = 'profil';
  user: any;
  notfocused = false;
  editMode = false;
  editPW = false;
  passwordChanged = false;
  userDataChanged = false;
  usernamInUse = false;
  updateProfile = this.fb.group({
    herstellername: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });
  updatePW = this.fb.group({
    oldPW: ['', Validators.required],
    newPW: ['', Validators.required],
    newPWConfirm: ['', Validators.required],
  },
    {
      validator: MustMatch('newPW', 'newPWConfirm')
    })
  constructor(private userApi: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
   this.userApi.userLoggedIn.subscribe(data => console.log(data))
    this.userApi.getLoggedInUser().subscribe(
      data => {
        this.username = data.toString()
        this.userApi.GetUserByName(this.username).subscribe(val => { this.user = val })
      },
      error => console.log(error, 'No User found')
    )
  }

  get f() { return this.updateProfile.controls; }
  get pw() { return this.updatePW.controls; }

  open(id: string) {
    this.activePage = id
  }

  usernameFree(username) {

  }

  onSubmit() {
    const updateData = this.updateProfile.value
    const userUpdate = {
      herstellername: updateData.herstellername,
      username: updateData.username,
      email: updateData.email,
    }

    this.userApi.UpdateUser(this.username, userUpdate)
    this.userDataChanged = true;
    this.editMode = false
    setTimeout(() => {
      this.userDataChanged = false;
    }, 3000);
  }

  onChangePW() {
    const updatePW = {
      password: this.updatePW.value.newPWConfirm
    }
    this.userApi.UpdateUser(this.username, updatePW)
    this.passwordChanged = true
    this.editPW = false
    setTimeout(() => {
      this.passwordChanged = false;
    }, 3000);
  }
}
