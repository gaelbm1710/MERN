import * as Yup from "yup";

export function initialValues(soporte, email){
    return{
        documentos: soporte?.documentos || "",
        servicio: soporte?.servicio || "",
        descripcion: soporte?.descripcion || "",
        dueno: soporte && soporte.dueno ? soporte.dueno : email,
        asignado: soporte?.asignado || "",
        estado: soporte?.estado || "",
        comentarios: soporte?.comentarios || ""
    };
}

export function validationSchema(){
    return Yup.object({
        documentos: Yup.string().required(false),
        servicio: Yup.array().of(Yup.string()).nullable(),
        descripcion: Yup.string().required(false) ,
        dueno: Yup.string().email(true).required(true),
        asignado: Yup.string().required(true),
        estado: Yup.string().required(true),
        comentarios: Yup.string().required(true)
    });
}