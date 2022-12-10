import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { DetallePasajeroPage } from '../detalle-pasajero/detalle-pasajero.page';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '..//storage.service';




@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
})
export class DetalleViajePage implements OnInit {
  viajeId; usuario; role;


  comentario: string;
  costo: number;
  destino: string;
  pago: string;
  nombre: string;
  apellido_p: string;
  apellido_m: string;
  username: string;

  cant_pasajeros:any;
  
  auto; color;
  travel;
  constructor(private service: StorageService,private actRoute: ActivatedRoute, 
   private alertCtrl: AlertController,private http: HttpClient,private router:Router) { }

  async ngOnInit() {
    
    
    
    const pasajero = await this.service.getValor();

  
    this.role = pasajero[0].role;

    const viaje = await this.service.getConKey(this.viajeId);

    
    const conductor = await this.service.getConKey(viaje[0].idConductor);

    this.comentario = viaje[0].comentario;
    this.costo = viaje[0].costo;
    this.destino = viaje[0].destino;
    this.pago = viaje[0].pago;
    this.nombre=conductor[0].nombre;
    this.apellido_p=conductor[0].apellido_p;
    this.apellido_m=conductor[0].apellido_m;
    this.usuario=conductor[0].usuario;
    this.cant_pasajeros=viaje[0].pasajeros.length;
  }
  async tomarViaje() {
    const alert = await this.alertCtrl.create({
      header: 'Caution',
      message: 'De click para aceptar',
      buttons: [{
        text: 'Si',
        handler: async () => {
          if (await this.verifViaje()) {
            await this.res();
          } else {
            const alerta = await this.alertCtrl.create({
              header: 'Caution',
              buttons: ['OK']
            });
            await alerta.present();
          }
        },
      }, {
        text: 'No',
        role: 'cancel'
      }]
    });
    await alert.present();
  };
  async res() {
    
    const pasajero = await this.service.getValor();
    const viaje = await this.service.getConKey(this.viajeId);
    
    this.travel = await viaje;
    
    (this.travel[0].pasajeros).push(pasajero[0]);
    
    this.service.delete(this.travel[0].id);
    
    await this.service.guardar(this.viajeId, this.travel);
  }
  async verifViaje() {
    const lista = await this.service.listar();
    const usrActual = await this.service.getValor();
    let doTrip = true;
    for await (const i of lista) {
      if (i[0].pasajeros !== undefined) {
        if (i[0].pasajeros.length !== 0) {
          if (usrActual[0].id === i[0].pasajeros[0].id) {
            doTrip = false;
          }
        }
      }
    } return doTrip;
  }
}

