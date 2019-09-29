import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-approv',
  templateUrl: './approv.component.html',
  styleUrls: ['./approv.component.css']
})
export class ApprovComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ApprovComponent>) { }

  ngOnInit() {
  }

}
