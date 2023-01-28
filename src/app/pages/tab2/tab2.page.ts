import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../sercises/news.service';
import { Article } from '../../interfaces/index';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  //Permite acceder a un elemento del DOM
  @ViewChild(IonInfiniteScroll, {static: true} ) infiniteScroll!: IonInfiniteScroll;

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

  loadData(){
    this.newsService.getTopHeadlinesCategory(this.selectedCategory, true)
      .subscribe(articles => {

        //Comprobamos si el ultimo articulo es igual al articulo en memoria
        if (articles[articles.length - 1].title === this.articles[this.articles.length - 1].title) {
          //Desactivamos el infinite scroll
          this.infiniteScroll.disabled = true;
          return;
        }

        this.articles = articles;
        this.infiniteScroll.complete();
      });
  }

}
