import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Anuncios, Usuario } from 'src/app/models/interfaces';
import { AnunciosService } from 'src/app/services/anuncios.service';
import { ToastController } from '@ionic/angular';
import { MapaPage } from '../mapa/mapa.page';
@Component({
  selector: 'app-agregar-anuncio',
  templateUrl: './agregar-anuncio.page.html',
  styleUrls: ['./agregar-anuncio.page.scss'],
})
export class AgregarAnuncioPage implements OnInit {
  mapa:boolean = false;
  anuncioForm: FormGroup;
  user:Usuario=JSON.parse(localStorage.getItem('usuario') || '{}');
  estados:string[]=['Malo','Bueno','Excelente'];
  tipos:string[]= ['Casa','Departamento','Terreno'];
  file1:File;
  file2:File;
  file3:File;
  file4:File;
  file5:File;
  loading=false;
  lng:string='';
  lat:string='';
  ubicacion:string="";
  constructor(
    private route: Router,
    private modalController:ModalController ,
    private fb: FormBuilder,
    private anuncioService: AnunciosService,
    public toastController: ToastController,
  ) {
    this.anuncioForm = this.fb.group({
      titulo: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      anio: ['' ],
      tipo:['', [Validators.required]],
      estado: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
      
    })
   }

  ngOnInit() {
  }
  cerrar(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }
 async agregar(){
    
if(this.file1 === undefined && this.file2===undefined && this.file3===undefined &&this.file4===undefined &&this.file5===undefined ){

    this.presentToast("Se debe incluir al menos 1 imagen");
}else{
  if(this.lng!=undefined){

  
  this.loading=true;
 setTimeout(() => {
  const anuncioGuardar:Anuncios={
    uidPer:this.user.uid,
    imagen:[],
    titulo:this.anuncioForm.get('titulo')?.value,
    precio:this.anuncioForm.get('precio')?.value,
    descripcion:this.anuncioForm.get('descripcion')?.value,
    anio:this.anuncioForm.get('anio')?.value,
    tipo:this.anuncioForm.get('tipo')?.value,
    estado: this.anuncioForm.get('estado')?.value,
    ciudad:this.anuncioForm.get('ciudad')?.value,
    direccion:this.anuncioForm.get('direccion')?.value,
    lat:this.lat,
    lng:this.lng
    } 
     this.anuncioService.inserAnuncio(anuncioGuardar); 
     this.loading=false;
     this.presentToast('Anuncio agregado exitosamente')
     this.cerrar();
    }, 5000);
  }else{
    this.presentToast("Se debe incluir la ubicación");
  }
}

    
  }
  img:any='ss';
  chooseFile1(event){
    this.file1 = event.target.files[0];
    this.anuncioService.saveImg(this.file1);
  }
  chooseFile2(event){
    this.file2 = event.target.files[0];
    this.anuncioService.saveImg(this.file2);
  }
  chooseFile3(event){
    this.file3 = event.target.files[0];
    this.anuncioService.saveImg(this.file3);
  }
  chooseFile4(event){
    this.file4 = event.target.files[0];
    this.anuncioService.saveImg(this.file4);
  }
  chooseFile5(event){
    this.file5 = event.target.files[0];
    this.anuncioService.saveImg(this.file5);
  }
  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message:mensaje,
      duration: 5000
    });
    toast.present();
  }
  async presentModal(){
    const modal = await this.modalController.create({
            component: MapaPage,
      cssClass: 'my-custom-class',
    });
    await modal.present();
    const {data} = await modal.onDidDismiss();
    /* Si no regreso es undefined */
    this.lng=data.lng;
    this.lat=data.lat;
    if(this.lng!=undefined){
      const coordenadas = JSON.parse(localStorage.getItem('coordenadas') || '{}');
      this.ubicacion=coordenadas.lng + " : " + coordenadas.lat; 
      this.lng=coordenadas.lng;
      this.lat=coordenadas.lat; 
    }else{
      this.ubicacion="";
    }
   
  }
  
}
