import * as Yup from "yup";
export function initialValues(mag){
    return{
        folio_IyD: mag?.folio_IyD || 0,
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
        asesor: mag?.asesor || ""
    };
}

export function validationSchema(){
    return Yup.object({
        folio_IyD: Yup.number().required(true),
        infoDes: Yup.string().required(true),
        clasi: Yup.string().required(true),
        caducidad: Yup.number().required(true),
        tipoF: Yup.string().required(true),
        excl: Yup.string().required(true),
        refri: Yup.string().required(true),
        receta: Yup.string().required(true),
        necesita_formula: Yup.string().required(true),
        comClie: Yup.string().required(true),
        comInt: Yup.string().required(true),
    });
}