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
  vkid;
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
    const vkLink = this.newsItem.networkLinks.find(l => l.type.id === 1);
    if (!vkLink)
      return;

    console.log(vkLink.value);
    const first = vkLink.value.substring(vkLink.value.indexOf("VK.W"),vkLink.value.indexOf("');")+3);
    this.vkid = first.substring(first.indexOf('Post("')+6, first.indexOf('", '));
    eval(first);
    console.log(first);
  
  }

}
