import * as Yup from "yup";

export function initialValuess(mag){
    return{
        folio_IyD: mag?.folio_IyD || 0,
        email: mag?.email || "",
        comClie: mag?.comClie || "",
        asesor: mag?.asesor || "",
        precio1: mag?.precio1 || 0,
        precio2: mag?.precio2 || 0,
        precio3: mag?.precio3 || 0,
        precio4: mag?.precio4 || 0,
        precio5: mag?.precio5 || 0,
        precio6: mag?.precio6 || 0,
        precio7: mag?.precio7 || 0,
        precio8: mag?.precio8 || 0,
    };
}

export function validationSchemas(){
    return Yup.object({
        folio_IyD: Yup.number().required(true),
        infoDesa: Yup.string().required(true),
        caducidad: Yup.number().required(true),
        tipoF: Yup.string().required(true),
        receta: Yup.boolean().required(true),
        
    });
}