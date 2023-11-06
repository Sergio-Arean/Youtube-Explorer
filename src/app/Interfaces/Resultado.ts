import { Video } from "./Video";

export interface Resultado{
    id:string, //para el borrado supongo que es necesario
    fecha:string, //si bien para esta propiedad y la de abajo usaremos date, eq esto facilita el json
    hora:string, //lo ultimo q hicimos fue cambiar esto a number
    pais:string,
    cantidad:string, //string? EQ si, no realizamos manipulacion numerica asiq x ahora eq es un string
    categoria:string,
    videos:Video[],
}

/*	date:
	pais : 
	cantidad : 
	categoria :
	videos[] 
	id? //por borrado
*/