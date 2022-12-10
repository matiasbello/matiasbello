import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage.service';
import { ToastController, AlertController } from '@ionic/angular';
import { PasajeroPage } from '../pasajero/pasajero.page';


@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {
  viajeId; usuario; rol;


  comentario: string;
  costo: number;
  destino: string;
  pago: string;
  nombre: string;
  apaterno: string;
  amaterno: string;
  username: string;
  cant_pasajeros:number;

  auto; color;
  viajeActual;
  constructor(private actRoute: ActivatedRoute, private http: HttpClient,
    private service: StorageService, private alertCtrl: AlertController) { }

  async ngOnInit() {
    this.viajeId = this.actRoute.snapshot.paramMap.get('id');
    const pasajero = await this.service.getValor();

    this.rol = pasajero[0].rol;

    const viaje = await this.service.getConKey(this.viajeId);


    const conductor = await this.service.getConKey(viaje[0].idConductor);

    this.comentario = viaje[0].comentario;
    this.costo = viaje[0].costo;
    this.destino = viaje[0].destino;
    this.pago = viaje[0].pago;
    this.nombre=conductor[0].nombre;
    this.apaterno=conductor[0].apaterno;
    this.amaterno=conductor[0].amaterno;
    this.username=conductor[0].username;
    this.cant_pasajeros=viaje[0].pasajeros.length;

  }
  async tomarViaje() {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: '¿Está seguro que desea subirse a este viaje?',
      buttons: [{
        text: 'Si',
        handler: async () => {
          if (await this.verifViaje()) {
            await this.res();
          } else {
            const alerta = await this.alertCtrl.create({
              header: 'Precacución',
              subHeader: 'Ya estás en otro viaje',
              message: 'No puedes tomar 2 viajes a la vez',
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
    this.viajeActual = await viaje;
    (this.viajeActual[0].pasajeros).push(pasajero[0]);
    this.service.delete(this.viajeActual[0].id);
    await this.service.guardar(this.viajeId, this.viajeActual);
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

