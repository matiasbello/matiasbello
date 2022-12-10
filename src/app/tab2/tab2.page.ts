import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  rol: string;
  destino: string;costo: number;comentario: string;pago: string;hora;fecha;
  pasajeros=[];
  recorrido;
  viajeDisp;
  vista;

  constructor(private service: StorageService) { }

  async ngOnInit() {
    await this.getViajePasajero();
    const usr = await this.service.getValor();
    this.rol = usr[0].rol;
    if (this.rol === 'conductor') {
      const viaje = await this.getViajeConductor();
      if (viaje === undefined) {

      } else if (viaje !== undefined) {
        this.recorrido = viaje;
        this.pasajeros = await viaje.pasajeros;

        this.viajeDisp = viaje.disponible;
        this.vista = viaje.visible;

        this.destino = viaje.destino;
        this.costo = viaje.costo;
        this.comentario = viaje.comentario;
        this.pago = viaje.pago;
        this.hora = viaje.hora;
        this.fecha = viaje.fecha;
      }
    } else if (this.rol === 'pasajero') {
      const viaje = await this.getViajePasajero();
      this.recorrido = viaje;
      if (this.recorrido === undefined) {
      } else {
        this.destino = viaje.destino;
        this.costo = viaje.costo;
        this.comentario = viaje.comentario;
        this.pago = viaje.pago;
        this.hora = viaje.hora;
        this.fecha = viaje.fecha;
        const con = await this.service.getConKey(viaje.idConductor);
       
        
      }
    }
  }
  async getViajeConductor(){
    const store = await this.service.listar();
    const usr = await this.service.getValor();
    for await (const i of store) {
      if(i[0].idConductor !== undefined && i[0].idConductor === usr[0].id){
          return i[0];
      }
    }
  }
  async getViajePasajero() {
    const store = await this.service.listar();
    const usr = await this.service.getValor();
    for await (const i of store) {
      if (i[0].idConductor !== undefined) {
        for await (const j of i[0].pasajeros) {
          console.log(usr[0])
          console.log(j)
          if (j.id === usr[0].id && i[0].visible === true) {
            return i[0];
          }
        }
      }
    }
  }
}
