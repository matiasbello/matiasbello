import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  usuario = {
    nombre: '',
    apaterno:'',
    amaterno:'',
    username:'',
    correo: '',
    rol: '',
    auto: {
      marca: '',
      modelo: '',
      patente: '',
      color: '',
      numAsientos:'',
    },patente: ''
  };

  constructor(private router: Router, private actRoute: ActivatedRoute,
    private toastCtrl: ToastController, private service: StorageService) {

  }

  async ngOnInit() {
    const user = await this.service.getValor();
    this.usuario.username = user[0].username;
    this.usuario.nombre = user[0].nombre;
    this.usuario.apaterno = user[0].apaterno;
    this.usuario.amaterno = user[0].amaterno;
    this.usuario.correo = user[0].correo;
    this.usuario.rol = user[0].rol;

    this.usuario.auto.marca = user[0].auto.marca;
    this.usuario.auto.modelo = user[0].auto.modelo;
    this.usuario.auto.numAsientos = user[0].auto.numAsientos;
    this.usuario.auto.color = user[0].auto.color;
    this.usuario.auto.patente = user[0].auto.patente;
  }

  
  async cerrarSesion(){
    const toast = await this.toastCtrl.create({
      message: 'Sesión cerrada.',
      duration: 2000
    });
    toast.present();
    this.service.delete('sesion');
    this.router.navigate(['/login']);
  }
}
