import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/data.service';
import { Anuncios, Usuario } from 'src/app/models/interfaces';
import { AnunciosService } from 'src/app/services/anuncios.service';
import { ItemDetailPage } from '../item-detail/item-detail.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public categories = [];
  public featuredProducts = [];
  public bestSellProducts = [];
  casas: Anuncios[] = [];
  departamentos: Anuncios[] = [];
  terrenos: Anuncios[] = [];
  anuncios: Anuncios[] = [];
  constructor(
    private data: DataService,
    private anuncioService: AnunciosService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.categories = this.data.getCategories();
    this.featuredProducts = this.data.getFeaturedProducts();
    this.bestSellProducts = this.data.getBestSellProducts();
    this.getAll();
  }
  clasificar() {
    this.casas = this.anuncios.filter((anuncio) => anuncio.tipo === 'Casa');
    this.departamentos = this.anuncios.filter(
      (anuncio) => anuncio.tipo === 'Departamento'
    );
    this.terrenos = this.anuncios.filter(
      (anuncio) => anuncio.tipo === 'Terreno'
    );
  }
  getAll() {
    this.anuncioService.getAnuncios().subscribe((res) => {
      this.anuncios = res;
      this.clasificar();
    });
  }
  async presentModal(anuncio:Anuncios) {
    const modal = await this.modalCtrl.create({
      component: ItemDetailPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'anuncio': anuncio,
      }
    });
    return await modal.present();
  }
}
