import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../sercises/news.service';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public categories: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  public selectedCategory: string = this.categories[0];

  public articles: Article[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getTopHeadlinesCategory(this.selectedCategory)
      .subscribe(articles => {
        this.articles = [...this.articles, ...articles]
      })
  }

  segmentChanged(category: any) {
    this.selectedCategory = category.detail.value;

    this.newsService.getTopHeadlinesCategory(this.selectedCategory)
      .subscribe(articles => {
        this.articles = [...articles]
      })
  }

}
