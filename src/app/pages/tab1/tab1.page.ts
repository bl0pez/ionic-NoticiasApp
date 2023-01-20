import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../sercises/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor( private NewsService: NewsService) {}

  ngOnInit() {
    this.NewsService.getTopHeadlines()
      .subscribe( resp => {
        
      });
  }

}
