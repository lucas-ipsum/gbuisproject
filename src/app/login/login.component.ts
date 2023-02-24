import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  loginFailed: boolean = false;
  allUsers: any;

  profileForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private userApi: ApiService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.userApi.GetUser().subscribe(res => {
      this.allUsers = res;
    });
  }

  onSubmit() {
    const loginData = this.profileForm.value
    this.userApi.loginUser(loginData).subscribe(
      data => {
        localStorage.setItem('token', data.toString())
        this.router.navigate(['/profil'])
        this.userApi.userLoggedIn.emit(true)
      },
      error => {
        this.errorMessage = error.error.message
        this.loginFailed = true
        this.userApi.userLoggedIn.emit(false)
      }
    )
    setTimeout(() => {
      this.loginFailed = false;
    }, 3000);
  }
}
