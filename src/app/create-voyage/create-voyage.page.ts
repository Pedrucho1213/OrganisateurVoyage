import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import NewTravel from '../models/new-travel';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
    selector: 'app-create-voyage',
    templateUrl: './create-voyage.page.html',
    styleUrls: ['./create-voyage.page.scss'],
})
export class CreateVoyagePage implements OnInit {

    nom: string;
    budget: number;
    debut: string;
    fin: string;

    constructor(
        public afDB: AngularFireDatabase,
        public afAuth: AngularFireAuth,
        private firestore: AngularFirestore
    ) {

    }

    ngOnInit() {}

    saveTravel() {
        this.afAuth.authState.subscribe(auth => {
            NewTravel.budgetTravel = this.budget;
            NewTravel.nameTravel = this.nom;
            NewTravel.startTravel = this.debut;
            NewTravel.endTravel = this.fin;
            NewTravel.userId = auth.uid;
            NewTravel.timeOrigin = new Date().toISOString();
            NewTravel.photoUrl = auth.photoURL;
            this.firestore.collection('travels').add(NewTravel).then(() => {
                location.href = '/home';
            });
        });
    }


}
