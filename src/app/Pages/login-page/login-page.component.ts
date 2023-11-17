import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Interfaces/Usuario';
import { AutentificacionService } from 'src/app/Services/autentificacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent 
{
  usuario = {
    email:'',
    password: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private autentificacion:AutentificacionService, 
    private router:Router){}

  formulario:FormGroup = this.formBuilder.group({
    email:['',[Validators.required, Validators.email]],
    password: ['',[Validators.required]]
  });
  
  /*metodos asociados a validaciones*/
  EmailValidoEnLogin(){
    if(!this.EmailAusente() && !this.EmailErroneo()){
      return true;
    }
    return false;
  }

  EmailAusente(){
    //metodo que valida email required 
    if(this.formulario.controls['email'].getError('required') && this.formulario.touched){
      return true;
    }
    return false;
  }
  
  EmailErroneo(){
    //metodo que valida email  con formato email
    if(this.formulario.controls['email'].getError('email') && this.formulario.touched){
      return true;
    }
    return false;
  }
  
  PasswordAusente(){
    //metodo que valida que el password este presente en el formulario
    if(this.EmailValidoEnLogin() && this.formulario.controls['password'].getError('required') && this.formulario.controls['password'].touched){
      return true;
    }
    return false;
  }


  async Ingresar(){
    //console.log(`Registrando al usuario:`,this.usuario);
    if(this.formulario.invalid) {
     // alert(`Validaciones operando bro!`);
      return;
    }
    try{
      const usuario:Usuario = {
        email:this.formulario.controls['email'].value,
        password: this.formulario.controls['password'].value
      };
      const response = await this.autentificacion.loguearse(usuario.email,usuario.password);
      if (response) {
        //alert(`Inicio de sesion ok!`);
        Swal.fire({
          title: "Hola!",
          text: "Has iniciado sesión exitosamente!",
          icon: "success"
        });
        console.log('Inicio de sesión exitoso', response);
        this.autentificacion.setUsuario(true,usuario.email);
        this.router.navigate(['/historial']);

        
      }else if(response==null) {
        alert(`Email y/o contraseña incorrecto/s`);
        //aca podemos dar mas info al usuario
      }else {
        alert(`ERROR AL INICIAR SESION`);
        console.log('Inicio de sesión fallido');
       
      }
     // console.log(`Login exitoso. Email: ${email} - Pass: ${password} `);
    }catch(error){
      console.log(`Error al Iniciar Sesion: ${error}`);
    }  
  }
  
}
