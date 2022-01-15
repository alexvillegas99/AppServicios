import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user:Usuario=JSON.parse(localStorage.getItem('usuario') || '{}');
  nombre:string='';
  telefono:string='';
  direccion:string='';
  editar:boolean=false;
  userNuevo:Usuario={
    nombre:"",
    telefono:"",
    direccion:""
  };
  constructor( private _userService: UserService) { }

  ngOnInit() {
    this.RestablecerDatos();
  }
  RestablecerDatos(){
    this.user=JSON.parse(localStorage.getItem('usuario') || '{}');
    this.nombre=this.user.nombre;
    this.telefono=this.user.telefono;
    this.direccion=this.user.direccion;
  }
  editarDatos(){
      if(this.editar){
        /* Aqui edita */
        if(this.nombre!="" && this.telefono!="" && this.direccion!=""){
          this.userNuevo.nombre=this.nombre;
          this.userNuevo.telefono=this.telefono;
          this.userNuevo.direccion=this.direccion;
          this.userNuevo.id=this.user.id;
          this._userService.updateUser(this.userNuevo);
          this.cambiarLocalStorage();
          
        }
        this.editar=!this.editar;
      }else{
        this.editar=!this.editar;
      }
  }
  cancelar(){
    this.RestablecerDatos();
    this.editar=false;
  }
  cambiarLocalStorage(){
    
      const usuario:Usuario={
        id:this.user.id,
        uid:this.user.uid,
        nombre:this.nombre,
        telefono:this.telefono,
        direccion:this.direccion,
        correo:this.user.correo
      }
      localStorage.setItem('usuario',JSON.stringify(usuario));
      this.RestablecerDatos();
  }
  

}
