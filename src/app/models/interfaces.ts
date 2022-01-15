import { StringMapWithRename } from "@angular/compiler/src/compiler_facade_interface";

export interface Usuario{
    id?:string,
    uid?:string,
    nombre:string,
    telefono:string,
    direccion:string,
    correo?:string,
    clave?:string
}
export interface Anuncios{
    id?:string,
    uidPer:string,
    titulo:string,
    anio?:string,
    estado:string,
    tipo:string,
    precio:number,
    ciudad:string,
    direccion:string,
    descripcion:string,
    imagen?:Imagenes[],
    lng:string,
    lat:string
}
export interface Imagenes{
    titulo:string
}


export interface misServicios{
    id:string;
}
export interface favoritos{
    id:string;
}