import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment.prod';
import * as mapboxgl from 'mapbox-gl';
import {Geolocation, Geoposition} from '@ionic-native/geolocation/ngx';
import NewTravel from '../models/new-travel';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
    selector: 'app-folder',
    templateUrl: './folder.page.html',
    styleUrls: ['./folder.page.scss'],
})

export class FolderPage implements OnInit {

    selectTabs = 'depenses';
    travelsEmpty = true;
    travels: any;
    travelsCollection: AngularFirestoreCollection<NewTravel>;

    constructor(
        private activatedRoute: ActivatedRoute,
        public geolocation: Geolocation,
        public afDB: AngularFireDatabase,
        public afAuth: AngularFireAuth,
        private firestore: AngularFirestore
    ) {
        this.afAuth.authState.subscribe(auth => {
            this.travelsCollection = firestore.collection<NewTravel>('travels', ref => {
                const date =  new Date();
                return ref.where('userId', '==', auth.uid).where('startTravel', '>', date.toISOString());
            });
            this.travelsCollection.valueChanges().subscribe(travels => {
                console.log(travels);

                if (travels.length > 0) {
                    this.travelsEmpty = false;
                }
            });
        });
    }

    ngOnInit() {
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
