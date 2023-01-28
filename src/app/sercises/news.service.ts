import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {};

  constructor(private http: HttpClient) { }

  private executeQuery<T>(endpoint: string) {
    return this.http.get<T>(`${apiUrl}${endpoint}`, {
      params: {
        apiKey: apiKey,
        country: 'us',
      },
    });
  }

  //Definimos el tipo de retorno
  getTopHeadlines(): Observable<Article[]> {

    return this.getTopHeadlinesCategory('business');

    // return this.executeQuery<RespuestaTopHeadlines>(`/top-headlines?category=business`,
    // ).pipe( //El pipe es para poder transformar la respuesta que nos da el servicio
    //   map(({ articles }) => articles)
    // )
  }

  //Tramos la categoria como parametro
  getTopHeadlinesCategory(category: string, loadMore: boolean = false): Observable<Article[]> {

    if (loadMore) {
      return this.getArticlesByCategory(category);
    }

    if (this.articlesByCategoryAndPage[category]) {
      return of(this.articlesByCategoryAndPage[category].articles);
    }

    return this.getArticlesByCategory(category);

  }

  private getArticlesByCategory(category: string): Observable<Article[]> {


    //Si la llave existe en el objeto incrementamos el valor de la pagina
    if (Object.keys(this.articlesByCategoryAndPage).includes(category)) {
      //this.articlesByCategoryAndPage[category].page++;
    } else { //Si no existe la creamos
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      }
    }

    const page = this.articlesByCategoryAndPage[category].page + 1;

    return this.executeQuery<RespuestaTopHeadlines>(`/top-headlines?category=${category}&page=${page}`)
      .pipe(
        map(({ articles }) => {

          if (articles.length === 0) return this.articlesByCategoryAndPage[category].articles;

          //Actualizamos el Objeto
          this.articlesByCategoryAndPage[category] = {
            page: page,
            articles: [...this.articlesByCategoryAndPage[category].articles, ...articles]
          }

          return this.articlesByCategoryAndPage[category].articles;
        })
      )

  }

}
