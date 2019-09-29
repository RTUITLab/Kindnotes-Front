import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/api/services';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompactTask } from 'src/app/api/models';
import { DetailedInformationComponent } from './detailed-information/detailed-information.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  tasks: CompactTask[] = [];

  constructor(private task: TasksService, public dialog: MatDialog) {
  }

  async getNews() {
    try {
      this.tasks = await this.task.apiTasksGet().toPromise();
    } catch (ex) {
      alert("Что-то не так!");
    }
  }

  getInitiator(task: CompactTask) {
    if (task.organizationInitiator)
      return task.organizationInitiator.name;
      
    return task.personInitiator.name;
  }

  setData(task: string) {
    const date: Date = new Date(task);
    const s : string = date.getDay() + 1 < 10 ? `0${date.getDay() + 1}` : `${date.getDay() + 1}`
    return `${s}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }

  ngOnInit() {
    this.getNews();
  }

  openDialog(task): void {
    const dialogRef = this.dialog.open(DetailedInformationComponent, {
      width: '70%',
      height: '70%',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
    });
  }
}
