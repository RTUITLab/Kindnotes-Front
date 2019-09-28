import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { IdentityService } from 'src/app/api/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authForm;

  constructor(private formBuilder: FormBuilder, private identity: IdentityService) {
    this.authForm = formBuilder.group({
      email: '',
      password: ''
    })
  }

  ngOnInit() {
  }

  async onSubmit(loginData) {
    try {
      const r = await this.identity.apiIdentityLoginPost$Json$Response({ body: loginData }).toPromise();
      localStorage.setItem("token", r.body.token);
    } catch (ex) {
      alert(`Чет не так! ${ex}`);
    }
  }
}
