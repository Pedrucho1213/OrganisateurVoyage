import { Component, OnInit } from '@angular/core';
import { ApiService } from '.././api.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import {NavController } from '@ionic/angular';



@Component({
  selector: 'app-recommandations',
  templateUrl: './recommandations.page.html',
  styleUrls: ['./recommandations.page.scss'],
})
export class RecommandationsPage implements OnInit {

  url;
  sites=[];
  pays ="France";
  constructor(private apiServices: ApiService,
    private route: Router, private modalController: ModalController, private nav: NavController) { }

  ngOnInit() {
    this.apiServices.getSites(this.pays).subscribe(data => {
      this.sites = data;

    });
  }

  httpGetAsync( id){
    var xmlHttp = new XMLHttpRequest();
   /* xmlHttp.onreadystatechange = function(){
      if(xmlHttp.readyState == 4 && xmlHttp.status ==200)
      //callback(xmlHttp.responseText);
    }*/
    xmlHttp.open("GET",`https://cors-anywhere.herokuapp.com/https://whc.unesco.org/en/list/${id}/gallery/&maxrows=1`, true);
    xmlHttp.setRequestHeader("Content-Type", "application/json");

    xmlHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xmlHttp.send(null);
    
 
  }

  async openModal(id){
    const modal = await this.modalController.create({
      component : ModalPage,
      componentProps: {
        custom_id: id
      }
    });
    return await modal.present();

  }

}
