import { Component, Input, OnInit } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';
import { Anuncios } from 'src/app/models/interfaces';
import { MapaCoordenadasPage } from '../mapa-coordenadas/mapa-coordenadas.page';
@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {
  selectedSize: number;
  selectedColor: number;
  activeVariation: string;
  usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  @Input() anuncio: Anuncios;
  constructor(
    private animatioCntrl: AnimationController,
    private modalCtrl: ModalController,

  ) { }
  numero='593';
  ngOnInit() {
    this.activeVariation = 'size';
   /*  this.numero=this.numero.toString() + Number(this.usuario.telefono).toString(); */
   this.numero=(593999952397).toString();
    console.log(this.numero);
  }

  segmentChanged(e: any) {
    this.activeVariation = e.detail.value;

    if (this.activeVariation == 'color') {
      this.animatioCntrl.create()
      .addElement(document.querySelector('.sizes'))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(0px)', 'translateX(100%)')
      .fromTo('opacity', '1', '0.2')
      .play();

      this.animatioCntrl.create()
      .addElement(document.querySelector('.colors'))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(-100%)', 'translateX(0)')
      .fromTo('opacity', '0.2', '1')
      .play();
    } else {
      this.animatioCntrl.create()
      .addElement(document.querySelector('.sizes'))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(100%)', 'translateX(0)')
      .fromTo('opacity', '0.2', '1')
      .play();

      this.animatioCntrl.create()
      .addElement(document.querySelector('.colors'))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(0px)', 'translateX(-100%)')
      .fromTo('opacity', '1', '0.2')
      .play();
    }
  }

  changeSize(size: number) {
    this.selectedSize = size;
  }

  changeColor(color: number) {
    this.selectedColor = color;
  }

  cerrar(){
this.modalCtrl.dismiss();
  }
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: MapaCoordenadasPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'lng': this.anuncio.lng,
        'lat':this.anuncio.lat,
      }
    });
    return await modal.present();
  }
  enviarMensaje(){
    const texto='sssss';
    let url = 'https://wa.me/' + this.numero + '?text=' + texto;
  /* const browser = this.iab.create(url,'_system'); */
  }
}
