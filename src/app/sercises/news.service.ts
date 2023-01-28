import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Article, ArticlesByCategoryAndPage, RespuestaTopHeadlines } from '../interfaces';
// Con el operador map podemos transformar la respuesta que nos da el servicio
import { map } from 'rxjs/operators';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private articlesByCategory:ArticlesByCategoryAndPage = {};

  constructor( private http: HttpClient) { }

  private executeQuery<T>(endpoint: string) {
    return this.http.get<T>(`${ apiUrl }${ endpoint }`, {
      params: { 
        apiKey: apiKey,
        country: 'us',
      },
    });
  }

  //Definimos el tipo de retorno
  getTopHeadlines():Observable<Article[]> {
    return this.executeQuery<RespuestaTopHeadlines>(`/top-headlines?category=business`,
    ).pipe( //El pipe es para poder transformar la respuesta que nos da el servicio
      map( ({ articles }) => articles ) 
    )
  }

  //Tramos la categoria como parametro
  getTopHeadlinesCategory( category: string ):Observable<Article[]> {
    return this.executeQuery<RespuestaTopHeadlines>(`/top-headlines?category=${ category }`).pipe( //El pipe es para poder transformar la respuesta que nos da el servicio
      map( ({ articles }) => articles ) 
    )
  }

}
