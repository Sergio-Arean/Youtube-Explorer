import { Resultado } from "./Resultado";

export interface Historial{
    id:string, //el id es el email
    resultados:Resultado[],
}