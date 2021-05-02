export interface servicio{
    id?:string,
    creador:string,
    categoria:string,
    imagen:string,
    titulo:string,
    descripcion:string,
    precio:number,
    ubicacion:string
}
export interface categoria{
    id?:string,
    nombre:string,
    imagen:string
}
export interface usuario{
    id?:string,
    nombre:string,
    telefono:string,
    correo:string,
    clave:string,
    imagen:string,
    informacion:string
}

export interface misServicios{
    id:string;
}
export interface favoritos{
    id:string;
}