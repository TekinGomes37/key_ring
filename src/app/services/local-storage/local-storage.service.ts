// commun imports
import { Injectable } from '@angular/core';

// plugins
import { Plugins, StoragePlugin } from '@capacitor/core';

// interfaces
import { IItemAccountNew, IItemAccount } from './interfaces/i-item-account';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public accounts: IItemAccount[];
  private storage: StoragePlugin;

  constructor() {
    this.storage = Plugins.Storage;
    this.accounts = [];

    this.initLocalStorage();
  }


  /**
   * Service preparation
   */
  private initLocalStorage(): void {
    this.storage.get({key: 'items-accounts'})
      .then((accounts) => {
        console.log(accounts);
        if (!accounts || !accounts.value) {
          this.storage.set({key: 'items-accounts', value: JSON.stringify(this.accounts)});
        } else {
          this.accounts = JSON.parse(accounts.value);
        }
      })
      .catch((notExist) => {
        console.log('hello error', notExist);
      });
  }

  /**
   * Add an account to memory
   */
  addNewItem(account: IItemAccountNew): Promise<boolean> {
    return new Promise((resolve) => {
      this.accounts.push(account);
      this.storage.set({key: 'items-accounts', value: JSON.stringify(this.accounts)})
        .then(() => {
          resolve(true);
        })
        .catch((errAddAccount) => {
          console.error('Error save account');
          resolve(false);
        });
    });
  }
}
