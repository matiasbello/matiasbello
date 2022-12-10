import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { nanoid } from 'nanoid';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  auto={
    marca: '',
    modelo: '',
    patente: '',
    color:'',
    numAsientos: 0,
  };
  ide: string;

  usuario = {
    id: '',
    nombre:'',
    apaterno:'',
    amaterno: '',
    username: '',
    password: '',
    pass: '',
    correo: '',
    rol: '',
    auto: this.auto,
  };

  constructor(private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,private service: StorageService) { }

  ngOnInit() {
  }
  async onSubmit() {
    if (this.usuario.password === this.usuario.pass) {
      if(this.usuario.rol === ''){
        const toast = await this.toastCtrl.create({
          message: 'Selecciona un rol',
          duration: 2000
        });
        toast.present();
      }
      const exp = /[a-z]+\.[a-z]+@duocuc\.cl/;
      
      if (exp.test(this.usuario.correo)) {
        if (this.usuario.rol === 'conductor') {
          await this.guardar();
          this.service.guardar('sesion', this.ide);
          const navigationExtras: NavigationExtras={
            state:{
              usr: this.usuario,
            }
          };
          const toast = await this.toastCtrl.create({
            message: 'Bienvenido ' + this.usuario.username + '!',
            duration: 3000,
            position: 'bottom',
          });
          await toast.present();
          this.router.navigate(['tabs'],navigationExtras);
        }
        else if (this.usuario.rol === 'pasajero') {
          
          await this.guardar();
          this.service.guardar('sesion', this.ide);

          const toast = await this.toastCtrl.create({
            message: 'Bienvenido ' + this.usuario.username + '!',
            duration: 3000,
            position: 'bottom',
          });
          const navigationExtras: NavigationExtras={
            state:{
              usr: this.usuario,
            }
          };
          await toast.present();
          this.router.navigate(['tabs'],navigationExtras);
        }
      } else {
        const toast = await this.toastCtrl.create({
          message: 'Aún hay campos inválidos',
          duration: 3000,
          position: 'bottom',
        });
        await toast.present();
      }
      
    } else if (this.usuario.password !== this.usuario.pass) {
      const alerta = await this.alertCtrl.create({
        header: 'Alerta',
        message: 'Ambas contraseñas deben coincidir',
      }); await alerta.present();
    }
  }
  async guardar(){
    if(this.usuario.rol === 'pasajero'){
      this.ide = nanoid(17);
    }else if(this.usuario.rol === 'conductor'){
      this.ide = nanoid(15);
    }
    const data = [{
      id: this.ide,
      nombre: this.usuario.nombre,
      apaterno: this.usuario.apaterno,
      amaterno: this.usuario.amaterno,
      username: this.usuario.username,
      password: this.usuario.password,
      correo: this.usuario.correo,
      rol: this.usuario.rol,
      auto: this.auto,
    }];
    await this.service.guardar(this.ide, data);
  }
}
