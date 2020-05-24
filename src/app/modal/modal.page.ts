import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment.prod';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { NavParams } from '@ionic/angular';
import { ApiService } from '.././api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  passedId = null;
  donne;
  description;
  title;
  lat;
  long;
  lng;
  lt;
  constructor(private modalController: ModalController, public geolocation: Geolocation, private navParams: NavParams, private apiService: ApiService) { }

  ngOnInit() {
    this.passedId = this.navParams.get('custom_id');
    console.log(this.passedId);
 
  }

  ionViewDidEnter() {
    this.apiService.getDescription(this.passedId).subscribe(data => {
      this.donne = data;
      //console.log(this.donne);
      this.description = this.donne.records[0].fields.short_description;
      this.title = this.donne.records[0].fields.site;
      this.lat = this.donne.records[0].fields.coordinates[0];
      this.long= this.donne.records[0].fields.coordinates[1];
      console.log(this.lat, this.long);
      this.getCoordinates();
      
    });

  }

 getCoordinates() {
    
    console.log(this.lat, this.long);
      const map = new mapboxgl.Map({
        accessToken: environment.mapBoxKey,
        container: 'mapbox', // container id
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [this.long, this.lat], // starting position
        zoom: 15 // starting zoom
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

      const marker = new mapboxgl.Marker()
      .setLngLat({
        lng : this.long,
        lat : this.lat
      }).addTo(map);
  
  }

  async closeModal() {
    await this.modalController.dismiss();

  }

}
