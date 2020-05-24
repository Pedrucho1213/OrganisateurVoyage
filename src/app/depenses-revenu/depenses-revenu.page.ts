import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FolderPage} from '../folder/folder.page';
import {AngularFirestore} from '@angular/fire/firestore';
import AddDepense from '../models/add-depense';

@Component({
    selector: 'app-depenses-revenu',
    templateUrl: './depenses-revenu.page.html',
    styleUrls: ['./depenses-revenu.page.scss'],
})
export class DepensesRevenuPage implements OnInit {
    constructor(
        private modalCtrl: ModalController,
        private firestore: AngularFirestore
    ) {
    }

    @Input() idTravel;
    @Input() idUser;
    descripccion: any;
    date: any;
    capital: any;
    moyen: any;
    concept: any;

    ngOnInit() {
        console.log('user', this.idUser);
        console.log('travel', this.idTravel);
    }

    goBack() {
        this.modalCtrl.dismiss();
    }

    saveDepense () {
        AddDepense.capital = this.capital;
        AddDepense.description = this.descripccion;
        AddDepense.date = this.date;
        AddDepense.type = this.capital;
        AddDepense.moyen = this.moyen;
        AddDepense.concept = this.concept;
        AddDepense.userId = this.idUser;
        AddDepense.travelId = this.idTravel;
        AddDepense.timeOrigin = new Date().toISOString();
        this.firestore.collection('budget').add(AddDepense).then(() => {
            this.modalCtrl.dismiss();
        });
    }


}
