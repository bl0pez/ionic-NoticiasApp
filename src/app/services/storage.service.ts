import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private _localArticles: Article[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  //retornamos una copia del array de articulos
  get getLocalArticles() {
    return [...this._localArticles];
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;

    this.loadFavorites();

  }

  async saveRemoveArticle(article: Article) {

    //Verificar si existe el articulo
    const exist = this._localArticles.find(art => art.title === article.title);

    //Si existe devuelvo el array sin el articulo
    if (exist) {
      this._localArticles = this._localArticles.filter(localArticle => localArticle.title !== article.title);
    } else {
      this._localArticles = [article, ...this._localArticles]
    }


    this._storage?.set('articles', this._localArticles);
  }

  async loadFavorites() {
    try {

      //Obtenemos los articulos del localstore
      const articles = await this._storage?.get('articles');
      //Establecemos los articulos 
      this._localArticles = articles || [];

    } catch (error) {


    }
  }

}
