import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }
  async guardar(id, value){
    await this.storage.set(id, value);
  }
  async getValor(){
    const ses = await this.storage.get('sesion');
    return await this.storage.get(ses);
  }
  async getConKey(id){
    return await this.storage.get(id);
  }
  async listar(){
    const listado = [];
    await this.storage.forEach((v, k) => {listado.push(v);});
    return listado;
  }
  delete(key: string){
    this.storage.remove(key);
  }
}
