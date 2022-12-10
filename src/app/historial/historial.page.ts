import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  pasajeros: any = [];
  conductores: any = [];

  username; rol; direccion;
  constructor(private http: HttpClient, private router: Router) {
    const usr = JSON.parse(localStorage.getItem('usr'));
    this.username = usr.username;
    this.rol = usr.rol;
    this.direccion = usr.direccion;
  }

  ngOnInit() {
    this.getPasajeros().subscribe(res => {
      this.pasajeros = res;
    });
    this.getConductores().subscribe(res =>{
      this.conductores = res;
    });
  }
  getPasajeros() {
    return this.http.get('assets/files/pasajeros.json').pipe(
      map((res: any) => {;
        return res.data;
      })
    );
  }
  getConductores(){
    return this.http.get('assets/files/conductores.json').pipe(
      map((res: any) =>{;
        return res.data;
      })
    );
  }
  proViaje(){
    const usr=JSON.parse(localStorage.getItem('usr'));
    const navi: NavigationExtras={state:{user: usr,}
    };this.router.navigate(['recorrido'], navi);
  }
}
