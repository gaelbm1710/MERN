import * as Yup from "yup";

export function initialValuesa(mag, email){
    return{
        cardcode:"",
        asesor: mag && mag.asesor ? mag.asesor : email,
        presentacion:"",
        clave_ex:"",
        actividad: "presentacion"
    }
}

export function validationSchemaa(mag){
    return Yup.object({
        asesor: Yup.string().email(true).required(true),
        cardcode: Yup.string().required(true),
        presentacion: Yup.array().of(Yup.string()).nullable(),
        clave_ex: Yup.string().required(true),
        actividad: Yup.string().required(false).oneOf(["presentacion"])
    })
}