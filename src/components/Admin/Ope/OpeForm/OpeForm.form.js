import * as Yup from "yup";
export function initialValues(mag){
    return{
        folio_Op: mag?.folio_IyD || 0,
        email: mag?.email || "",
        cardcode: mag?.cardcode || "",
        base: mag?.base || "",
        activos: mag?.activos || "",
        especialidad: mag?.especialidad || "",
        padecimiento: mag?.padecimiento || "",
        necesita_formula: mag?.necesita_formula || "",
        existe: mag?.existe || "",
        base_ex: mag?.base_ex || "",
        clave_ex: mag?.clave_ex || "",
        clasi: mag?.clasi || "",
        receta: mag?.receta || "",
        refri: mag?.refri || "",
        infoDes: mag?.infoDes || "",
        tipoF: mag?.tipoF || "",
        caducidad: mag?.caducidad || 0,
        comInt: mag?.comInt || "",
        excl: mag?.excl || "",
        presentacion: mag?.presentacion || "",
        sIyD: mag?.sIyD || "",
        comClie: mag?.comClie || "",
        asesor: mag?.asesor || "",
        precioUni: mag?.precioUni || 0,
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

export function validationSchema(){
    return Yup.object({
        folio_Op: Yup.number().required(true),
        precioUni: Yup.number().required(true),
        precio1: Yup.number().required(true),
        precio2: Yup.number().required(true),
        precio3: Yup.number().required(true),
        precio4: Yup.number().required(true),
        precio5: Yup.number().required(true),
        precio6: Yup.number().required(true),
        precio7: Yup.number().required(true),
        precio8: Yup.number().required(true),
    });
}