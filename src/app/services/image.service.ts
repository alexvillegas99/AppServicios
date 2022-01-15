import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { Usuario } from '../models/interfaces';
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private filePath: any;
  constructor(
    private storage: AngularFireStorage
  ) { }
     saveImg(img: File){
      
    this.filePath = `imagenes/${uuidv4()}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, img);
     task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImagen => {
             console.log( urlImagen);
             return urlImagen;
          })
        })
      ).subscribe();
    
    
  }
}
