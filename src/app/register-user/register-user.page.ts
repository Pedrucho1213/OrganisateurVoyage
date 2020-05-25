import {Component, OnInit} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
    selector: 'app-register-user',
    templateUrl: './register-user.page.html',
    styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {

    dataUser = {
        email: '',
        password: '',
        password2: ''
    };


    constructor(
        public toastController: ToastController,
        public afAuth: AngularFireAuth) {
    }

    ngOnInit() {
    }

    async createUser() {
        if (this.dataUser.password === this.dataUser.password2) {
            const toast = await this.toastController.create({
                message: 'Enregistrement réussi.',
                duration: 2000
            });
            this.saveData()
            await toast.present();

        } else {
            const toast = await this.toastController.create({
                message: 'Les mots de passe ne correspondent pas.',
                duration: 2000
            });
            await toast.present();
        }
    }

    saveData() {
        this.afAuth.createUserWithEmailAndPassword(this.dataUser.email, this.dataUser.password).then(data => {
            location.href = '/';
        });
    }



}
