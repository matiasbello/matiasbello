import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-olvidastecontra',
  templateUrl: './olvidastecontra.page.html',
  styleUrls: ['./olvidastecontra.page.scss'],
})
export class OlvidastecontraPage implements OnInit {

  password;
  conpassword;
  constructor(private toastCtrl: ToastController, private router: Router){}
  ngOnInit() {
  }
  async recuperar(){
    if(this.password === this.conpassword){
      const user = JSON.parse(localStorage.getItem('usr'));
      user.password = this.password;
      user.pass = this.conpassword;
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
        message: 'Las contraseña debe ser igual a la anterior',
        duration: 1000
      });
      toast.present();
    }
    
  }

}
