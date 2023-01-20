import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Article, RespuestaTopHeadlines } from '../interfaces';
// Con el operador map podemos transformar la respuesta que nos da el servicio
import { map } from 'rxjs/operators';

const apiKey = environment.apiKey

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor( private http: HttpClient) { }

  //Definimos el tipo de retorno
  getTopHeadlines():Observable<Article[]> {
    return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?category=business`, {
      params: {
        country: 'us',
        apiKey: apiKey
      }
    }).pipe( //El pipe es para poder transformar la respuesta que nos da el servicio
      map( ({ articles }) => articles ) 
    )
  }
}
