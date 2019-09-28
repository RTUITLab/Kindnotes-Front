import { Component, OnInit } from '@angular/core';
import { Work } from 'src/app/api/models';
import { WorksService } from 'src/app/api/services';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {


  tasks: Work[];

  constructor(private work: WorksService) {
  }

  async getNews() {
    try {
      this.tasks = await this.work.apiWorksGet$Json().toPromise();
    } catch (ex) {
      alert("Что-то не так!");
    }
  }

  ngOnInit() {
    this.getNews();
  }
}
