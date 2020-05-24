import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollectionGroup} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import {NewTravel} from '../models/new-travel';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
    selector: 'app-create-voyage',
    templateUrl: './create-voyage.page.html',
    styleUrls: ['./create-voyage.page.scss'],
})
export class CreateVoyagePage implements OnInit {

    nom: any;
    budget: any;
    debut: any;
    fin: any;
    newtravel: NewTravel;

    constructor(
        public afDB: AngularFireDatabase,
        public afAuth: AngularFireAuth,
        private firestore: AngularFirestore
    ) {}

    ngOnInit() {}

    saveTravel() {
        this.afAuth.authState.subscribe(auth => {
            this.newtravel.nameTravel = this.nom;
            this.newtravel.budgetTravel = this.budget;
            this.newtravel.startTravel = this.debut;
            this.newtravel.endTravel = this.fin;
            this.newtravel.userId = auth.uid;
            this.newtravel.timeOrigin = new Date().toISOString();
            this.newtravel.photoUrl = auth.photoURL;
            this.firestore.collection('travels').add(  this.newtravel).then(() => {
                location.href = '/home';
            });
        });
    }


}
