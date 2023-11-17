import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AutentificacionService } from "../Services/autentificacion.service";


export const loginGuard = ()=>{
    
    const router = inject(Router);
    const autentificacionService = inject(AutentificacionService);

    let usuario_logueado:boolean = autentificacionService.estaLogueado();
    if(usuario_logueado){
        return true;
    }else{
        router.navigate(['login']);
        return false;
    }
    //return true; //transitorio 16-11
   
}

