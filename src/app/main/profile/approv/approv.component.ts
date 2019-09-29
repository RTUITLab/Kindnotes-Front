import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { CompactTask } from 'src/app/api/models';
import { WorksService } from 'src/app/api/services';

@Component({
  selector: 'app-approv',
  templateUrl: './approv.component.html',
  styleUrls: ['./approv.component.css']
})
export class ApprovComponent implements OnInit {

  approvForm;
  fileName = '';
  constructor(public dialogRef: MatDialogRef<ApprovComponent>,  private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: CompactTask,
    private workService: WorksService) {
    this.approvForm = this.formBuilder.group({
      nameFile: ''
    });
   }

  ngOnInit() {
  }

  setFile(event)
  {
    const file = event.srcElement.files[0];
    this.fileName = file.name;
  }

  onSubmit() {
    this.postFile();
  }

  async postFile()
  {
    try{
      await this.workService.apiWorksIdContentPost$Json({id:this.data.id, body: `"${this.fileName}"`}).toPromise();
      this.dialogRef.close();
      
    } catch (ex)
    {

    }
  }
}
