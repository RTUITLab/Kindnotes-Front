import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { IdentityService } from 'src/app/api/services';
import { RegisterModel } from 'src/app/api/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  regForm;

  constructor(private formBuilder: FormBuilder, private identity: IdentityService, private router: Router) {
    this.regForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
      password: '',
      repPassword: ''
    })
  }

  ngOnInit() {
  }

  async onSubmit(regData: RegisterModel) {
    try {
      const r = await this.identity.apiIdentityRegisterPost$Json({body: regData}).toPromise();
      this.router.navigate(['/authentification']);
    } catch (ex) {
      alert(`Чет не так! ${ex}`);
    }
  }
}
