import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/api/services';
import { CompactTask } from 'src/app/api/models';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  tasks: CompactTask[] = [];

  constructor(private task: TasksService) {
  }

  async getNews() {
    try {
      this.tasks = await this.task.apiTasksGet$Json().toPromise();
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
}
