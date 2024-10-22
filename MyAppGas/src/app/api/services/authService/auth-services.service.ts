import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  constructor() { }

  async isDataExpired(): Promise<boolean> {
    const userData = await this.getDecrytedUserData();
    if (userData?.expiration && Date.now() < userData.expiration) {
        console.log("Usuario dentro del tiempo de expiracion")
        return true; 
    }
    console.log("Usuario fuera del tiempo de expiracion")
    await this.logout();
    return false;
  }

  async getDecrytedUserData() {
    const { value } = await Preferences.get({ key: 'userData'});
    if (value) {
      try {
        console.log("try")
        const bytes = CryptoJS.AES.decrypt(value, environment.apiKeySupabase);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
      } catch (e) {
        console.log(e)
        this.logout();
      }
    }
    return null;
  }

  async logout() {
    await Preferences.remove({key: 'userData'})
  }
}
