
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';

import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/models/interfaces';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registerForm: FormGroup;
  loading=false;
  user:Usuario={
    nombre:"",
    telefono:"",
    correo:"",
    clave:"",
    direccion:""
  }
  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private route: Router,
    private _errorService:ErrorService,
    public toastController: ToastController,
    private _userService: UserService
  ) {

    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['', [Validators.required]]
    },
      { validators: this.checkPassword })

   }



  ngOnInit() {
   
  }
  registrar() {
    this.user.correo = this.registerForm.get('correo')?.value;
    this.user.clave = this.registerForm.get('password')?.value;
    this.loading=true;
    this.afAuth.createUserWithEmailAndPassword(this.user.correo, this.user.clave)
      .then(rta => {
      rta.user?.sendEmailVerification();
      this.user.uid=rta.user.uid;
      this.user.telefono=this.registerForm.get('telefono')?.value;
      this.user.direccion=this.registerForm.get('direccion')?.value;
      this.user.nombre=this.registerForm.get('nombre')?.value;
      this._userService.inserUser(this.user);
        this.presentToast('Registro exitoso. \nEnviamos un correo para verificar su cuenta.');
        this.route.navigate(['/login']);
      }).catch(error => {
        console.log(error);
        this.loading=false;
        this.presentToast(this._errorService.error(error.code));
      })
  }
  checkPassword(group: FormGroup): any {
    const pass = group.controls.password?.value;
    const confirmarPass = group.controls.repetirPassword?.value;
    return pass === confirmarPass ? null : { notSame: true }
  }
  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message:mensaje,
      duration: 5000
    });
    toast.present();
  }
}
