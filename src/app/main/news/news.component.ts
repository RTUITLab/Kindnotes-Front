import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/api/services';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  events;

  constructor(private newsService: NewsService) {
  }


  ngOnInit() {
    this.load();
  }
  private async load() {
    this.events = await this.newsService.apiNewsGet().toPromise();
  }
}
