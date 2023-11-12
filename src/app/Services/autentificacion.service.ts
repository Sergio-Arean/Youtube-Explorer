import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService{
  usuario_logueado:boolean = false; //variable transitoria que usamos para simular login
  mail_usuario:string = '';



  constructor(private afauth:AngularFireAuth) {
    
   }

   setUsuario(logueo:boolean, email:string){
    this.usuario_logueado = logueo;
    this.mail_usuario = email;

   }

  async registrarse(email:string, password:string){
    try{
      return await this.afauth.createUserWithEmailAndPassword(email,password);
    }catch(err){
      console.log(`Error al Registrarse(desde autentificacionService):`,err);
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
      return true;
    } catch (error) {
      console.error('Error al hacer logout', error);
      return false;
    }
  }


  /*metodo para verificaciones*/
  // Método para verificar si hay un usuario logueado
    // Método para verificar si hay un usuario logueado
  // Método para verificar si hay un usuario logueado
  async usuarioLogueado(){
    return await this.hayUsuarioLogueado();
  }

  async hayUsuarioLogueado(): Promise<boolean> {
    try {
      const user = await this.afauth.currentUser;
      return user !== null;
    } catch (error) {
      console.error('Error al verificar si está logueado', error);
      return false;
    }
  }

  // Método para obtener el correo electrónico del usuario logueado
  getEmailUsuarioLogueado(): Observable<string | null> {
    return this.afauth.authState.pipe(
      map((user) => (user ? user.email : null))
    );
  }

  /** metodos de verificacion mas caseros */
  emailUsuario(){
    return this.mail_usuario;
  }
  estaLogueado(){
    return this.usuario_logueado;
  }


}
