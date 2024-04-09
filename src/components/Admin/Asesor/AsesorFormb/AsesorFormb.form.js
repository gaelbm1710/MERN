import * as Yup from "yup";

export function initialValuesb(mag, email){
    return{
        cardcode:"",
        asesor: mag && mag.asesor ? mag.asesor : email,
        presentacion:"",
        clave_ex:"",
        base_ex:"",
        actividad: "cambio",
        base: "",
        activos: "",
        necesita_muestra:false,

    }
}

export function validationSchemab(mag){
    return Yup.object({
        asesor: Yup.string().email(true).required(true),
        cardcode: Yup.string().required(true),
        presentacion: Yup.array().of(Yup.string()).nullable(),
        clave_ex: Yup.string().required(true),
        base_ex: Yup.string().required(true),
        actividad: Yup.string().required(false).oneOf(["cambio"]),
        necesita_muestra: Yup.bool(),
        activos: Yup.string().required(true),
        base: Yup.string().required(true),
    })
}