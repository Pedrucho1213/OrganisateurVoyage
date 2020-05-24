import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment.prod';
import * as mapboxgl from 'mapbox-gl';
import {Geolocation, Geoposition} from '@ionic-native/geolocation/ngx';
import {NewTravel} from '../models/new-travel';
import {AddDepense} from '../models/add-depense';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {ModalController} from '@ionic/angular';
import {DepensesRevenuPage} from '../depenses-revenu/depenses-revenu.page';

@Component({
    selector: 'app-folder',
    templateUrl: './folder.page.html',
    styleUrls: ['./folder.page.scss'],
})

export class FolderPage implements OnInit {

    selectTabs = 'depenses';
    travelsEmpty = true;
    idUser: any;
    travels: any;
    budget: any;
    idTravelNow: any;
    travelsCollection: AngularFirestoreCollection<NewTravel>;
    budgetCollection: AngularFirestoreCollection<AddDepense>;
    date = new Date();

    constructor(
        private activatedRoute: ActivatedRoute,
        public geolocation: Geolocation,
        public afDB: AngularFireDatabase,
        public afAuth: AngularFireAuth,
        private firestore: AngularFirestore,
        private modalCtrl: ModalController
    ) {
        this.afAuth.authState.subscribe(auth => {
            this.idUser = auth.uid;
            this.travelsCollection = firestore.collection<NewTravel>('travels', ref => {
                return ref.where('userId', '==', auth.uid).where('startTravel', '>=', this.date.toISOString());
            });
            const data = this.travelsCollection.snapshotChanges().pipe(map(changes => {
                return changes.map(action => {
                    return action.payload.doc.id;
                });
            }));
            data.subscribe(travelId => {
                this.travelsCollection.valueChanges().subscribe(travelData => {
                    console.log('este es el json',travelData);
                    if (travelData[0].endTravel < this.date.toISOString()) {
                    } else {
                        this.travelsEmpty = false;
                        this.idTravelNow = travelId[0];
                        this.getbudget(this.idTravelNow);
                    }
                });
            });
        });
    }

    ngOnInit() {
    }

    async sendId() {
        const modal = await this.modalCtrl.create({
            component: DepensesRevenuPage,
            componentProps: {
                idTravel: this.idTravelNow,
                idUser: this.idUser
            }
        });
        await modal.present();
    }

    getbudget(id: string) {
        this.budgetCollection = this.firestore.collection<AddDepense>('budget', ref => {
            return ref.where('travelId', '==', id);
        });
        this.budgetCollection.valueChanges().subscribe(budget => {
            this.budget = budget;
        });
    }

    getCoordinates() {
        this.geolocation.getCurrentPosition().then((geolocation: Geoposition) => {
            const map = new mapboxgl.Map({
                accessToken: environment.mapBoxKey,
                container: 'mapbox', // container id
                style: 'mapbox://styles/mapbox/satellite-v9',
                center: [geolocation.coords.longitude, geolocation.coords.latitude], // starting position
                zoom: 12 // starting zoom
            });
            map.addControl(new mapboxgl.NavigationControl());
            map.addControl(
                new mapboxgl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true
                    },
                    trackUserLocation: true
                })
            );
        });
    }

}
