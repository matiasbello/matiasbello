import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  rol: string;

  constructor(private service: StorageService) {}
  async ngOnInit() {
    const user = await this.service.getValor();
    this.rol = user[0].rol;
  }
}
