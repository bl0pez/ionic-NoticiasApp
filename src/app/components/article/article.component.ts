import { Component, Input } from '@angular/core';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';

//Plugins
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

import { StorageService } from '../../services/storage.service';

import { Article } from 'src/app/interfaces';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  @Input() article!: Article;
  @Input() index!: number;

  constructor(
    private iab:InAppBrowser,
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private StorageService: StorageService
    ) { }


  onClick(){

  }

  openArticle(){

    if(this.platform.is('ios') || this.platform.is('android')){
      const browser = this.iab.create(this.article.url);
      browser.show();
      return;
    }

    window.open(this.article.url, '_blank');

  }

  /**
   * Metodo para mostrar el menu de opciones
   */
  async onOpenMenu(){

    const articleInFavorites = this.StorageService.articleInFavorites(this.article);

    const normalBtns: ActionSheetButton[] = [
      {
        text: articleInFavorites ? 'Eliminar de favoritos' : 'Agregar a favoritos',
        icon: articleInFavorites ? 'heart' : 'heart-outline',
        handler: () => this.onToggleFavorite()
      },{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel'
      }
    ]

    const shareBtn: ActionSheetButton = {
      text: 'Compartir',
      icon: 'share-social-outline',
      handler: () => this.onshareArticle()
    }

    //Validar si es un dispositivo movil
    if(this.platform.is('capacitor')){
      normalBtns.unshift(shareBtn)
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: normalBtns
    });


    await actionSheet.present();

  }

  onshareArticle(){
    const { title, source, url } = this.article;

    this.socialSharing.share(
      title,
      source.name,
      '',
      url
    )
  }

  //Guardamos o eliminamos el articulo de favoritos
  onToggleFavorite(){
    this.StorageService.saveRemoveArticle(this.article);
  }


}
