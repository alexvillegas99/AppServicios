import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Anuncios } from 'src/app/models/interfaces';
import { AnunciosService } from 'src/app/services/anuncios.service';
import { AgregarAnuncioPage } from '../agregar-anuncio/agregar-anuncio.page';

@Component({
  selector: 'app-mis-servicios',
  templateUrl: './mis-servicios.page.html',
  styleUrls: ['./mis-servicios.page.scss'],
})
export class MisServiciosPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private anuncioService: AnunciosService
  ) { }
    anuncios:Anuncios[]=[];
  ngOnInit() {
    this.getAll();
  }
  async presentModal(){
    const modal = await this.modalCtrl.create({
            component: AgregarAnuncioPage,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }
  getAll(){
    this.anuncioService.getAnuncios().subscribe((res) => {
      this.anuncios=res;
    });
  }

}
