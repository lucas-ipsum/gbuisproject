import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { MustMatch } from '../helpers/must-match.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  notfocused: boolean = false;
  isDisabled: boolean = false;
  regSuccess: boolean = false;
  emailAlreadyInUse: boolean = false;
  usernameAlreadyInUse: boolean = false;
  profileForm = this.fb.group({
    herstellername: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    passwort: ['', [Validators.required, Validators.minLength(6)]],
    confirmPasswort: ['', Validators.required],
    AGBAccepted: [false, Validators.requiredTrue]
  },
    {
      validator: MustMatch('passwort', 'confirmPasswort')
    });

  constructor(private userApi: ApiService, private fb: FormBuilder) { }

  get f() { return this.profileForm.controls; }

  ngOnInit(): void { }

  onSubmit() {
    this.isDisabled = true
    const User = {
      herstellername: this.profileForm.value.herstellername,
      email: this.profileForm.value.email,
      username: this.profileForm.value.username,
      password: this.profileForm.value.passwort,
      rolle: 'none'
    }
    this.userApi.registerUser(User).subscribe(
      () => {
        this.regSuccess = true
      }
    )
  }
}
