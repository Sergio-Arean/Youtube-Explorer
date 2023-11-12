import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutentificacionService } from 'src/app/Services/autentificacion.service';
import { HistorialBusquedaService } from 'src/app/Services/historial-busqueda.service';

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

  constructor(private autentificacion:AutentificacionService,private router: Router, private historialBusqueda:HistorialBusquedaService){}


  async Registrarse(){
    //console.log(`Registrando al usuario:`,this.usuario);
    try{
      const {email,password} = this.usuario;
      const response = await this.autentificacion.registrarse(email,password);
      if(response!=null){
        await this.historialBusqueda.crearEspacioEnBdd(email);
        alert(`Registro exitoso. Email: ${email} - Pass: ${password} `);
        //Redireccion para que el usuario se pueda loguear
        this.router.navigate(['/login']);
      }

    }catch(error){
      console.log(`Error al registrarse: ${error}`);
    }
    
    
  }
}
