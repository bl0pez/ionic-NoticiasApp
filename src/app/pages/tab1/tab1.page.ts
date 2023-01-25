import { Component, OnInit } from '@angular/core';
import { Article } from '../../interfaces';
import { NewsService } from '../../sercises/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  
  // Creamos un arreglo de tipo Article
  public articles: Article[] = [];

  constructor( private NewsService: NewsService) {}


  ngOnInit() {
    this.NewsService.getTopHeadlines()
      .subscribe( articles => {
        this.articles.push(...articles);
      });
  }

}
