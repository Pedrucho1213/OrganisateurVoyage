import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireAuth } from '@angular/fire/auth';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  correo: any;
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Accueil',
      url: '/folder/Inbox',
      icon: 'home'
    },
    {
      title: 'Recommandations',
      url: '/recommandations',
      icon: 'compass'
    },
    {
      title: 'Vos voyages',
      url: '/voyages',
      icon: 'airplane'
    }
  ];

  constructor(
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar,
      public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(auth => {
      this.correo = auth.email;
    });
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  deconnexion () {
    this.afAuth.signOut().then(() => {
      location.href='/';
    });
  }
  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
