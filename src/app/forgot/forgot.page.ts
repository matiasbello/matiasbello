import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  contrasena;
  conContrasena;
  constructor(private toastCtrl: ToastController, private router: Router){}
  ngOnInit() {
  }
  async recuperar(){
    if(this.contrasena === this.conContrasena){
      const user = JSON.parse(localStorage.getItem('usr'));
      user.password = this.contrasena;
      user.pass = this.conContrasena;
      //elimino al usuario antiguo y lo añado altok
      localStorage.removeItem('usr');
      localStorage.setItem('usr', JSON.stringify(user));
      const toast = await this.toastCtrl.create({
        message: 'Contraseñas reestablecida',
        duration: 2000
      });
      toast.present();
      this.router.navigate(['../login']);
    }else{
      const toast = await this.toastCtrl.create({
        message: 'Las contraseñas no coinciden',
        duration: 2000
      });
      toast.present();
    }
    //acá se supone que debo cambiar el valor del usuario que está en el lS
    //llamar al usuario
    //si está en el lS y si el nombre de este es igual al nombre de acá, entonces cambia la contraseña
  }

}
