import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CompactTask, FullTask } from 'src/app/api/models';
import { switchMap } from 'rxjs/operators';
import { NewsService } from 'src/app/api/services';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-news-detailed',
  templateUrl: './news-detailed.component.html',
  styleUrls: ['./news-detailed.component.css']
})
export class NewsDetailedComponent implements OnInit {

  @Input() passedId: number;

  newsItem: FullTask;
  newsItemId: number;
  vkid;
  ytid;
  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (this.passedId) {
      this.newsItemId = this.passedId;
      this.load();
    }
    else
      this.route.paramMap.subscribe(params => {
        this.newsItemId = +params.get("id");
        this.load();
      })
  }

  private async load() {
    this.newsItem = await this.newsService.apiNewsIdGet({ id: this.newsItemId }).toPromise();

    this.handleVK();
    this.handleYT();
  }
  private handleYT() {
    const ytLink = this.newsItem.networkLinks.find(l => l.type.id === 2);
    if (!ytLink)
      return;
    console.log(ytLink.value);
    
    this.ytid = `https://www.youtube.com/embed/${ytLink.value}`;
    console.log(this.ytid);
    
  }
  private handleVK() {
    const vkLink = this.newsItem.networkLinks.find(l => l.type.id === 1);
    if (!vkLink)
      return;

    console.log(vkLink.value);
    const first = vkLink.value.substring(vkLink.value.indexOf("VK.W"), vkLink.value.indexOf("');") + 3);
    this.vkid = first.substring(first.indexOf('Post("') + 6, first.indexOf('", '));
    eval(first);
    console.log(first);
  }
}
