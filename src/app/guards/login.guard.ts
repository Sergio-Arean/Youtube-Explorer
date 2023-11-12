import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AutentificacionService } from "../Services/autentificacion.service";
/*
export const loginGuard = async ()=>{
    
    const autentificacionService = inject(AutentificacionService);
    const router = inject(Router);
    let usuario_logueado:boolean = await autentificacionService.usuarioLogueado();
    let email_usuario_logueado = await autentificacionService.getEmailUsuarioLogueado();
    console.log(`valor desde guard de si hay un usuario logueado:${usuario_logueado}, email usuario
    logueado: ${email_usuario_logueado}`);
	if(usuario_logueado){
        return true;
    }else{
        router.navigate(['login']);
        return false;
    }
}*/

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
   
}

