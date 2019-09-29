import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CompactTask, FullTask } from 'src/app/api/models';
import { switchMap } from 'rxjs/operators';
import { NewsService } from 'src/app/api/services';

@Component({
  selector: 'app-news-detailed',
  templateUrl: './news-detailed.component.html',
  styleUrls: ['./news-detailed.component.css']
})
export class NewsDetailedComponent implements OnInit {

  newsItem: FullTask;
  newsItemId: number;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => 
      {
        this.newsItemId= +params.get("id");
        this.load();
      })
  }

  private async load() {
    this.newsItem = await this.newsService.apiNewsIdGet({id: this.newsItemId}).toPromise();
  }

}
