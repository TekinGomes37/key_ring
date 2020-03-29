// commun impots
import { AlertController } from '@ionic/angular';
import { Component } from '@angular/core';

// inbterfaces
import { IItemAccount } from './../../services/local-storage/interfaces/i-item-account';

// services
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public accounts: IItemAccount[];

  constructor(public localStorage: LocalStorageService, private alert: AlertController) {
    this.accounts = [];
  }

  ionViewDidEnter() {
    this.accounts = this.localStorage.accounts;
  }

  async showAlertToAddNewAccount() {
    const alertInput = await this.alert.create({
      header: 'Info compte',
      inputs: [
        {
          name: 'service',
          type: 'text',
          placeholder: 'Netflix'
        },
        {
          name: 'email',
          type: 'text',
          placeholder: 'mon@compte.fr'
        },
        {
          name: 'mdp',
          type: 'text',
          placeholder: 'O_o'
        },
      ],
      buttons: [
        {
          text: 'Ajouter',
          role: 'ok',
          handler: (alertData) => {
            this.addNewAccount(alertData);
          }
        }
      ]
    });

    await alertInput.present();
  }

  private async addNewAccount(params: any) {
    if (!params.service || !params.email || !params.mdp) {
      return alert('Veuillez saisir tout les champs !');
    }

    await this.localStorage.addNewItem({
      password: params.mdp,
      service: params.service,
      mail: params.email,
      createdAt: new Date(),
      id: this.uuidv4()
    });
  }

  async showAccount(idService: string) {
    const findAccount = this.accounts.find(x => x.id === idService);
    if (findAccount) {
      const accountAlert = await this.alert.create({
        header: findAccount.service,
        subHeader: `Email ${findAccount.mail}`,
        message: `Mot de passe : ${findAccount.password}`,
        buttons: ['OK']
      });

      await accountAlert.present();
    }
  }

  private uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
