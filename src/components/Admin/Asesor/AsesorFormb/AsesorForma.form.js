import * as Yup from "yup";

export function initialValuesb(mag){
    return{
        cardcode:"",
        asesor:"",
        presentacion:"",
        clave_ex:""
    }
}

export function validationSchemab(mag){
    return Yup.object({
        asesor: Yup.string().email(true).required(true),
        cardcode: Yup.string().required(true),
        presentacion: Yup.string().required(false),
        clave_ex: Yup.string().required(true)
    })
}