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

    return `${date.getDay() - 1}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }

  ngOnInit() {
    this.getNews();
  }

  openDialog() {
    this.dialog.open(DetailedInformationComponent, {
      data: {
        animal: 'panda'
      }
    });
  }
}
