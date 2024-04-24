import * as Yup from "yup";

export function initialValuess(mag){
    return{
        folio_IyD: mag?.folio_IyD || 0,
        email: mag?.email || "",
        comClie: mag?.comClie || "",
        asesor: mag?.asesor || ""
    };
}

export function validationSchemas(){
    return Yup.object({
        folio_IyD: Yup.number().required(true),
        infoDesa: Yup.string().required(true),
       // clasi: Yup.string().required(true),
        caducidad: Yup.number().required(true),
        tipoF: Yup.string().required(true),
        //refri: Yup.boolean().required(true),
        receta: Yup.boolean().required(true),
        //comClie: Yup.string().required(true),
        //comInt: Yup.string().required(true),
    });
}