import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompactTask } from 'src/app/api/models';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-finish-task',
  templateUrl: './finish-task.component.html',
  styleUrls: ['./finish-task.component.css']
})
export class FinishTaskComponent implements OnInit {

  finishForm;

  constructor(public dialogRef: MatDialogRef<FinishTaskComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: CompactTask, private formBuilder : FormBuilder) {
      this.finishForm = this.formBuilder.group({
        // nameFile: ''
      })
     }

  ngOnInit() {
  }

  onSubmit()
  {

  }

}
