import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  recuperarForm: FormGroup;
  loading=false;
  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private route: Router,
    public toastController: ToastController,
    private _errorService: ErrorService) {
    this.recuperarForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
  }
  recuperarPassword() {
    const usuario = this.recuperarForm.get('usuario')?.value;
    this.loading=true;
    this.afAuth.sendPasswordResetEmail(usuario).
      then(() => {
        
        this.presentToast('Enviamos un correo electrónico para restablecer su contraseña.');
        this.route.navigate(['/login']);
      }).catch(error => {
        this.presentToast(this._errorService.error(error.code))
        this.loading=false;
        this.recuperarForm.reset();
      })
  }
  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message:mensaje,
      duration: 5000
    });
    toast.present();
  }
}
