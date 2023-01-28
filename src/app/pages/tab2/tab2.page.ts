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
        this.articles = [...articles ]
      })
  }

  segmentChanged(category: Event) {
    this.selectedCategory = (category as CustomEvent).detail.value;

    this.newsService.getTopHeadlinesCategory(this.selectedCategory)
      .subscribe(articles => {
        this.articles = [...articles]
      })
  }

  loadData( event: any){
    this.newsService.getTopHeadlinesCategory(this.selectedCategory, true)
      .subscribe(articles => {

        //Comprobamos si el ultimo articulo es igual al articulo en memoria
        if (articles[articles.length - 1].title === this.articles[this.articles.length - 1].title) {
          event.target.disabled = true;
          return;
        }

        this.articles = articles;
        event.target.complete();
      });
  }

}
