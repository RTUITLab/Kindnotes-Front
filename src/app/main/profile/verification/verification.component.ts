import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/service/user-service.service';
import { IdentityService } from 'src/app/api/services';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  verifForm;

  constructor(public dialogRef: MatDialogRef<VerificationComponent>, private formBuilder: FormBuilder, private userService: UserService, private verifService: IdentityService) {
    this.verifForm = formBuilder.group({
      phone: ''
    })
  }


  ngOnInit() {
  }

  async onSubmit(phone) {
    try {
      const r = await this.verifService.apiIdentityVerifyPost$Json({ body: `"${phone.phone}"` }).toPromise();
      localStorage.setItem("token", r.token);
      this.userService.getUserModel();
      this.dialogRef.close();
    } catch (ex) {
      alert(`Чет не так! ${ex}`);
    }
  }
}
