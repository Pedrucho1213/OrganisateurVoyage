import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Platform } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  providerFb: firebase.auth.FacebookAuthProvider;

  dataUser = {
    email: '',
    password: ''
  };
  connected: boolean;
  constructor(
      public afDB: AngularFireDatabase,
      public afAuth: AngularFireAuth,
      private fb: Facebook,
      public platform: Platform) {

    this.afAuth.authState.subscribe(auth => {
      if (!auth){
        console.log('non connecté');
        this.connected = false;
      }else {
        console.log('connecté');
        this.connected = true;
        location.href = '/home';
      }
    });


  }

  ngOnInit() {
  }

  login() {
    this.afAuth.signInWithEmailAndPassword(this.dataUser.email, this.dataUser.password);
    this.dataUser = {
      email: '',
      password: ''
    };
  }

  SignUp() {
    this.afAuth.createUserWithEmailAndPassword(this.dataUser.email, this.dataUser.password);
  }

  async googleLogin () {
    const res = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    console.log(JSON.stringify(res));
  }

  facebookLogin() {
    if (this.platform.is('cordova')) {
      console.log('platforme cordova')
      this.facebookCordova();
    }else {
      console.log('platform web');
      this.facebookWeb();
    }
  }

  facebookCordova() {
    this.fb.login(['email']).then( (response) => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);
      firebase.auth().signInWithCredential(facebookCredential)
          .then((success) => {
            console.log('Info Facebook: ' + JSON.stringify(success));
          }).catch((error) => {
        console.log('Erreur: ' + JSON.stringify(error));
      });
    }).catch((error) => { console.log(error); });
  }

  facebookWeb() {
    this.afAuth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((success) => {
          console.log('Info Facebook: ' + JSON.stringify(success));
        }).catch((error) => {
      console.log('Erreur: ' + JSON.stringify(error));
    });
  }

}
