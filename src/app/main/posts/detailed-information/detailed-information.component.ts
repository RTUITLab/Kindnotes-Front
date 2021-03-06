import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompactTask, FullTask, CompactPrice } from 'src/app/api/models';
import { TasksService, WorksService } from 'src/app/api/services';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-detailed-information',
  templateUrl: './detailed-information.component.html',
  styleUrls: ['./detailed-information.component.css']
})
export class DetailedInformationComponent implements OnInit {

  task : FullTask;

  constructor(public dialogRef: MatDialogRef<DetailedInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompactTask,
    private taskServe: TasksService, private workService : WorksService) { }

  ngOnInit() {
    this.getFullTask();
  }

  getInitiator(task: FullTask) {
    if (task.organizationInitiator)
      return task.organizationInitiator.name;
      
    return task.personInitiator.name;
  }

  setData(task: string) {
    const date: Date = new Date(task);
    const s : string = date.getDay() + 1 < 10 ? `0${date.getDay() + 1}` : `${date.getDay() + 1}`
    return `${s}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }

  getPrice(price: CompactPrice)
  {
    if(price.priceType.id == 1)
      return price.value;

      return price.priceType.name;
  }

  async getFullTask() {
    try {
      this.task = await this.taskServe.apiTasksIdGet({id: this.data.id}).toPromise();
    } catch (ex) {
      alert("Что-то не так!");
    }
  }

  async onTakeTask()
  {
    try{
    await this.workService.apiWorksPost$Json({body: this.task.id}).toPromise();
    this.dialogRef.close();
    } catch (ex)
    {
      alert("Необходимо пройти верификацию в профиле!");
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
