import * as Yup from "yup";

export function initialValuess(mag){
    return{
        folio_IyD: mag?.folio_IyD,
        email: mag?.email,
        comClie: mag?.comClie,
        asesor: mag?.asesor,
        precio1: mag?.precio1,
        precio2: mag?.precio2,
        precio3: mag?.precio3,
        precio4: mag?.precio4,
        precio5: mag?.precio5,
        precio6: mag?.precio6,
        precio7: mag?.precio7,
        precio8: mag?.precio8,
    };
}

export function validationSchemas(){
    return Yup.object({
        folio_IyD: Yup.number().required(true),
    });
}