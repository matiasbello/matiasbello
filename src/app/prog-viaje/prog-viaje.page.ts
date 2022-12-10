import { Component, AfterViewInit, } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, ToastController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { nanoid } from 'nanoid';

@Component({
  selector: 'app-prog-viaje',
  templateUrl: './prog-viaje.page.html',
  styleUrls: ['./prog-viaje.page.scss'],
})
export class ProgViajePage implements AfterViewInit {
  

  viaje = {
    id: '',
    disponible: true,
    destino: '',
    costo: 200,
    comentario: '',
    pago: '',
    idConductor: '',
    fecha: '',
    hora: '',
    pasajeros: [],
    nAsientos: null,
  };
  viaje1 = [];
  rol: string;
  asientos: number;
  idViaje: string;

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController,
    private router: Router, private service: StorageService) { }

  async ngAfterViewInit() {
    //LIMPIAR CAMPOS
    this.viaje.comentario = '';
    this.viaje.pago = null;
    this.viaje.costo = 200;
   

    
   
    

  
  }
  async submit() {
    //ACÁ VA LA LÓGICA DE EVITAR 2 VIAJES PARA EL MISMO CONDUCTOR
    //necesito buscar un viaje donde le idConductor sea el sesion
    if (this.viaje.costo >= 400 && this.viaje.costo <= 7000) {
      const alert = await this.alertCtrl.create({
        header: '¡El viaje ha sido publicado con éxito!',
        buttons: [{
          text: 'Ok',
          role: 'confirm'
        }],
      }); await alert.present();
      const usr = await this.service.getValor();

      this.viaje.idConductor = usr[0].id;
      this.viaje1.push(this.viaje);
      this.idViaje = nanoid(20);
      this.viaje.id = this.idViaje;
      this.service.guardar(this.idViaje, this.viaje1);
      this.router.navigate(['tabs/tab1']);
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Límite de dinero fuera de rango($400 --- $7000)',
        duration: 3000,
      });
      toast.present();
    }
  }
 
  getFecha(event){
    const fecha = new Date(event.detail.value);
    this.viaje.fecha = fecha.toLocaleDateString();
    this.viaje.hora = fecha.toLocaleTimeString();
  }
}
