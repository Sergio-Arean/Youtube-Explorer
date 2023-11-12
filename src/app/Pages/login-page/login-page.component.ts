import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutentificacionService } from 'src/app/Services/autentificacion.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  usuario = {
    email:'',
    password: ''
  };

  constructor(private autentificacion:AutentificacionService, private router:Router){}


  async Ingresar(){
    //console.log(`Registrando al usuario:`,this.usuario);
    try{
      const {email,password} = this.usuario;
      const response = await this.autentificacion.loguearse(email,password);
      if (response) {
        alert(`Inicio de sesion ok!`);
        console.log('Inicio de sesión exitoso', response);
        this.autentificacion.setUsuario(true,email);
        this.router.navigate(['/historial']);

        
      } else {
        alert(`ERROR AL INICIAR SESION`);
        console.log('Inicio de sesión fallido');
       
      }
     // console.log(`Login exitoso. Email: ${email} - Pass: ${password} `);
    }catch(error){
      console.log(`Error al Iniciar Sesion: ${error}`);
    }
    

}
}
