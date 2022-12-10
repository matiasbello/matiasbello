import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  username: string;
  rol: string;

  listaViajes = [];

  constructor(private service: StorageService, private alertCtrl: AlertController,
    private router: Router) { }

  async ngOnInit() {
      const usr = await this.service.getValor();
      this.username = usr[0].username;
      this.rol = usr[0].rol;
    if (this.rol === 'conductor') {
      
    } else if (this.rol === 'pasajero') {
      await this.listarViajes();
    }
  }
  async listarViajes() {
    const all = await this.service.listar();
    for await (const i of all) {
      const id: string = i[0].id;
      if (id === undefined) {
        continue;
      } else if (id.length === 20 && i[0].disponible === true) {
        this.listaViajes.push(i[0]);
      }else if(id.length === 20 && i[0].disponible === false){
        
      }
    }
  }
  async progViaje() {
    if (await this.verifRealizar()) {
      this.router.navigate(['recorrido']);
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Alerta...',
        subHeader: 'Ya estás realizando un viaje',
        message: 'No es posible realizar 2 viajes al mismo tiempo',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async verifRealizar() {
    const ses = await this.service.getValor();
    const lis = await this.service.listar();
    for await (const i of lis) {
     
      if (i[0].idConductor !== undefined ) {
        console.log(i[0].idConductor)
        if (i[0].idConductor === ses[0].id) {
          if (i[0].disponible === true) {
            return false;
          }
        }
        

        
      }
    } return true;
  }

}
