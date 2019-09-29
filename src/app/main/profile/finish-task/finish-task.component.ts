import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompactTask } from 'src/app/api/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WorksService } from 'src/app/api/services';

@Component({
  selector: 'app-finish-task',
  templateUrl: './finish-task.component.html',
  styleUrls: ['./finish-task.component.css']
})
export class FinishTaskComponent implements OnInit {

  finishForm : FormGroup;

  constructor(public dialogRef: MatDialogRef<FinishTaskComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: CompactTask, private formBuilder : FormBuilder, private workService: WorksService) {
      this.finishForm = this.formBuilder.group({
        VK: '',
        Twitter: '',
        Instagram: '',
        YouTube: ''
      })
     }

     get sourceLink() {
       return `${location.origin}/news/${this.data.id}`;
     }
  ngOnInit() {
  }

  async onsend(val, id)
  {
    console.log(this.finishForm.value[val]);
    console.log(id);
    await this.workService.apiWorksIdLinkLinkTypeIdPost$Json({
      id: this.data.id,
      linkTypeId: id,
      body: JSON.stringify(this.finishForm.value[val])
    }).toPromise();
    this.dialogRef.close();
  }

  onSubmit(val)
  {
  }

}
