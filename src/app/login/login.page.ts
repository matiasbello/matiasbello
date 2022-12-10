import { StorageService } from '../storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario = {
    username: '',
    password: '',
  };
  username = '';
  password = '';
  users;
  constructor(private router: Router, private toastCtrl: ToastController,
    private alertCtrl: AlertController, private service: StorageService) { }

  ngOnInit() {}

  async onSubmit() {
    await this.verificar();
    if (await this.verificar() !== undefined) {
      const usr = await this.verificar();
      await this.service.guardar('sesion', usr.id);
      const toast = await this.toastCtrl.create({
        message: '!Hola de vuelta querido estudiante de DuocUC! ' + this.usuario.username,
        duration: 1000
      });
      toast.present();
      this.usuario.username = '';
      this.usuario.password = '';
      this.router.navigate(['/tabs']);
    }
    else {
      const alert = await this.alertCtrl.create({
        header: 'Informacion no corresponde, inténtelo nuevamente',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
  irARegistro() {
    this.router.navigate(['registro']);
    }
  async alert() {
    if (this.usuario.username === undefined || this.usuario.username === '') {
      const toast = await this.toastCtrl.create({
        message: 'Introduzca username.',
        duration: 3000
      });
      toast.present();
    } else {
      const usr = JSON.parse(localStorage.getItem('usr'));
      if (this.usuario.username === usr.username) {
        const toast = await this.toastCtrl.create({
          message: 'Hola ' + this.usuario.username,
          duration: 3000
        });toast.present();
        this.router.navigate(['../olvidastecontra']);
      } else {
        const toast = await this.toastCtrl.create({
          message: 'No hay datos almacenados',
          duration: 1000
        });
        toast.present();
      }
    }
  }
  async verificar(){
    const todos = await this.service.listar();
    this.users = todos;
    for await (const u of this.users) {
      if(this.usuario.password === u[0].password && this.usuario.username === u[0].username){
        return u[0];
      }
    }
  }
}

