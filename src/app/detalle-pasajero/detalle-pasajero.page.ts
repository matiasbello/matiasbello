import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StorageService } from '../storage.service';


@Component({
  selector: 'app-detalle-pasajero',
  templateUrl: './detalle-pasajero.page.html',
  styleUrls: ['./detalle-pasajero.page.scss'],
})


export class DetallePasajeroPage implements OnInit {
  perId; user; role;


  comentario: string;
  costo: string;
  destino: string;
  pago: number;

  auto; color;
  travel;
  constructor(private actRoute: ActivatedRoute, private http: HttpClient,
    private router: Router, private service: StorageService) { }

  async ngOnInit() {
    this.perId = this.actRoute.snapshot.paramMap.get('id');
    console.log(this.perId)

  
    const res = await this.savePasajero();
    
    const pasajero = await this.service.getValor();
    this.role = pasajero[0].role;

    const viaje = await this.service.getConKey(this.perId);

    this.comentario = viaje[0].comentario;
    this.costo = viaje[0].costo;
    this.destino = viaje[0].destino;
    this.pago = viaje[0].pago;
    console.log(this.comentario);

    

  }
  async savePasajero(){
    const pasajero = await this.service.getValor();
    const viaje = await this.service.getConKey(this.perId);
    this.travel = await viaje;
    (this.travel[0].pasajeros).push(pasajero[0]);
    return this.travel;
  };
}
