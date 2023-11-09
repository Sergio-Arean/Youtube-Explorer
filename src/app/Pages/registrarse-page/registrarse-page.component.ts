import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutentificacionService } from 'src/app/Services/autentificacion.service';

@Component({
  selector: 'app-registrarse-page',
  templateUrl: './registrarse-page.component.html',
  styleUrls: ['./registrarse-page.component.css']
})
export class RegistrarsePageComponent {
  usuario = {
    email:'',
    password: ''
  };

  constructor(private autentificacion:AutentificacionService,private router: Router){}


  async Registrarse(){
    //console.log(`Registrando al usuario:`,this.usuario);
    try{
      const {email,password} = this.usuario;
      await this.autentificacion.registrarse(email,password);
      console.log(`Registro exitoso. Email: ${email} - Pass: ${password} `);

      //Redireccion para que el usuario se pueda loguear
      this.router.navigate(['/login']);
    }catch(error){
      console.log(`Error al registrarse: ${error}`);
    }
    
    
  }
}
