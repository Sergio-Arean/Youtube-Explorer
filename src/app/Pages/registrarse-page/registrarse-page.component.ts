import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Interfaces/Usuario';
import { AutentificacionService } from 'src/app/Services/autentificacion.service';
import { HistorialBusquedaService } from 'src/app/Services/historial-busqueda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrarse-page',
  templateUrl: './registrarse-page.component.html',
  styleUrls: ['./registrarse-page.component.css']
})

export class RegistrarsePageComponent
{
  usuario = {
    email:'',
    password: ''
  };
  lista_usuarios:string[] = [];
  email_invalido:boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private autentificacion:AutentificacionService,
    private router: Router, 
    private historialBusqueda:HistorialBusquedaService){}

  ngOnInit(){
    this.cargarListaUsuarios();

  }
  
  formulario:FormGroup = this.formBuilder.group({
    email:['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(6)]]
  });

  async cargarListaUsuarios(){
    await this.historialBusqueda.getUsuariosRegistrados(this.lista_usuarios);
  }
  
  async Registrarse(){
    //console.log(`Registrando al usuario:`,this.usuario);

    if(this.formulario.invalid || this.email_invalido) {
      //alert(`Validaciones operando bro!`);
      return;
    }
    try{
    //  const {email,password} = this.usuario;
      /*15-11*/ 
      const nuevo_usuario:Usuario = {
        email:this.formulario.controls['email'].value,
        password: this.formulario.controls['password'].value
      };
      const response = await this.autentificacion.registrarse(nuevo_usuario.email,nuevo_usuario.password);
      if(response!=null){
        await this.historialBusqueda.crearEspacioEnBdd(nuevo_usuario.email);
       // alert(`Registro exitoso. Email: ${nuevo_usuario.email} - Pass: ${nuevo_usuario.password} `);
       Swal.fire({
        title: "Bienvenido!",
        text: "Te has registrado exitosamente!",
        icon: "success"
      });
        //Redireccion para que el usuario se pueda loguear
        this.router.navigate(['/login']);
      }

    }catch(error){
      console.log(`Error al registrarse: ${error}`);
    }
  }

  /*metodos asociados a validaciones de formulario*/
  EmailValido(){
    if(!this.EmailAusente() && !this.EmailErroneo() && !this.EmailEnUso()){
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
  
  EmailEnUso(){
      //metodo que valida email  en uso x otro usuario
      //let usuarios:string[] = [];
      //await this.historialBusqueda.usuariosRegistrados(usuarios);
    if (this.formulario.controls['email'].touched && !this.EmailErroneo()){
      let email_ingresado = this.formulario.controls['email'].value;
      let usuario_encontrado:boolean = false;

      for(let i:number=0; i<this.lista_usuarios.length && !usuario_encontrado;i++){
        if(email_ingresado==this.lista_usuarios[i]){
          usuario_encontrado = true;
          this.email_invalido = true;
          return true;
        }
      }
      this.email_invalido = false;
      return false; //si termina el for, es porque el mail ingresado esta disponible
      
    }else{
      console.log(`soy el metodo validador y retorno false sin
      verificar la lista de usuarios`);
      return false;
    }    
  }
  
  PasswordAusente(){
    //metodo que valida que el password este presente en el formulario
    if(this.EmailValido() && this.formulario.controls['password'].getError('required') && this.formulario.controls['password'].touched){
      return true;
    }
    return false;
  }
  
 // y a su vez el registrarse tendria adicionales:
  PasswordMuyCorto(){
    if(this.formulario.controls['password'].touched && this.EmailValido()){
      if(this.formulario.controls['password'].getError('minlength')){
        return true;
      } else{
        return false;
      }
    }
      return false;
  }

  PasswordAceptable(){
    if(this.EmailValido() && this.formulario.controls['password'].touched && !this.PasswordAusente() && !this.formulario.controls['password'].getError('minlength')){
      return true; //solo aparece el check si el campo fue tocado y el password length no arroja error
    }
    return false;
  }
  
}
