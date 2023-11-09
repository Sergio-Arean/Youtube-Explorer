import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {
  user: Observable<firebase.User|null>;
  constructor(private afauth:AngularFireAuth) {
    this.user = afauth.authState;
   }

  async registrarse(email:string, password:string){
    try{
      return await this.afauth.createUserWithEmailAndPassword(email,password);
    }catch(err){
      console.log(`Error al Registrarse:`,err);
      return null;
    }
  }

  async loguearse(email:string, password:string){
    try{
      return await this.afauth.signInWithEmailAndPassword(email,password);
    }catch(err){
      console.log(`Error al Loguearse:`,err);
      return null;
    }
  }

  async loguearseConGoogle(email:string, password:string){
    try{
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }catch(err){
      console.log(`Error al Loguearse con Google:`,err);
      return null;
    }
  }


  async logout() {
    try {
      await this.afauth.signOut();
      console.log('Logout exitoso');
    } catch (error) {
      console.error('Error al hacer logout', error);
    }
  }
}
