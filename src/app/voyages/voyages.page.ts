import {Component, OnInit} from '@angular/core';
import NewTravel from '../models/new-travel';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';


@Component({
    selector: 'app-voyages',
    templateUrl: './voyages.page.html',
    styleUrls: ['./voyages.page.scss'],
})
export class VoyagesPage implements OnInit {
    travelsCollection: AngularFirestoreCollection<NewTravel>;
    datas;
    constructor(
        public afDB: AngularFireDatabase,
        public afAuth: AngularFireAuth,
        private firestore: AngularFirestore
    ) {
        this.afAuth.authState.subscribe(auth => {
            this.travelsCollection = firestore.collection<NewTravel>('travels', ref => {
                return ref.where('userId', '==', auth.uid);
            });
            const data = this.travelsCollection.snapshotChanges().pipe(map(changes => {
                return changes.map(action => {
                    return action.payload.doc.id;
                });
            }));
            this.travelsCollection.valueChanges().subscribe(traveler => {
                data.subscribe(travelerId => {
                    this.datas = traveler;
                    this.datas[0].id = travelerId[0];
                });
            });

        });

    }

    ngOnInit() {
    }
    getDetails(id: string) {
        this.travelsCollection.doc(id).valueChanges().subscribe(datos => {
            console.log('this is the result', datos);
        });
        //console.log(id);
    }

}
