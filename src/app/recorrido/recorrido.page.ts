import { Component, AfterViewInit, } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { nanoid } from 'nanoid';

@Component({
  selector: 'app-recorridoviaje',
  templateUrl: './recorrido.page.html',
  styleUrls: ['./recorrido.page.scss'],
})
export class RecorridoPage implements AfterViewInit {
  

  viaje = {
    id: '',
    disponible: true,
    destino: '',
    costo: 1000,
    comentario: '',
    pago: '',
    idConductor: '',
    fecha: '',
    hora: '',
    pasajeros: [],
    num_asi: null,

  };
  viaje1 = [];
  rol: string;
  asientos: number;
  idViaje: string;

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController,
    private router: Router, private service: StorageService) { }

  async ngAfterViewInit() {
    
    this.viaje.comentario = '';
    this.viaje.pago = null;
    this.viaje.costo = 1000;
   

    
   
    

  
  }
  async submit() {
    
    if (this.viaje.costo >= 200 ) {
      const alert = await this.alertCtrl.create({
        header: '¡Su viaje ya ha sido publicado!',
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
        message: 'El rango mínimo es 200$ ...',
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
