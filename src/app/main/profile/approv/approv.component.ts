import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-approv',
  templateUrl: './approv.component.html',
  styleUrls: ['./approv.component.css']
})
export class ApprovComponent implements OnInit {

  approvForm;

  constructor(public dialogRef: MatDialogRef<ApprovComponent>,  private formBuilder : FormBuilder) {
    this.approvForm = this.formBuilder.group({
      nameFile: ''
    });
   }

  ngOnInit() {
  }

  onSubmit() {
    
  }

}
