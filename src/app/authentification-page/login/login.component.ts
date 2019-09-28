import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { IdentityService } from 'src/app/api/services';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authForm;

  constructor(private formBuilder: FormBuilder, private identity: IdentityService, private router: Router, private userService: UserService) {
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
      this.router.navigate(['']);
      this.userService.getUserModel();
    } catch (ex) {
      alert(`Чет не так! ${ex}`);
    }
  }
}
