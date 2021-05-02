import { Component, OnInit } from '@angular/core';
import { usuario } from '../../models/interfaces';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor() { }

    nombre:'';
    telefono:'';
    correo:'';
    clave:'';
    imagenPerfil:'assets/foto.png';
    informacion:'';

  ngOnInit() {
  }

}
