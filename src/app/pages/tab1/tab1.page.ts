import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from '../../interfaces';
import { NewsService } from '../../sercises/news.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  // Seleccionamos el elemento del DOM
  @ViewChild(IonInfiniteScroll, {static: true} ) infiniteScroll!: IonInfiniteScroll;
  
  // Creamos un arreglo de tipo Article
  public articles: Article[] = [];

  constructor( private NewsService: NewsService) {}


  ngOnInit() {
    this.NewsService.getTopHeadlines()
      .subscribe( articles => {
        this.articles.push(...articles);
      });
  }

  loadData(){
    this.NewsService.getTopHeadlinesCategory('business', true)
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
