import * as Yup from "yup";

export function initialValuesss(mag) {
    return {
        folio_IyD: mag?.folio_IyD,
        email: mag?.email || "",
        cardcode: mag?.cardcode || "",
        base: mag?.base || "",
        activos: mag?.activos || "",
        especialidad: mag?.especialidad || "",
        padecimiento: mag?.padecimiento || "",
        necesita_muestra: mag?.necesita_muestra || false,
        existe: mag?.existe || false,
        base_ex: mag?.base_ex || "",
        clave_ex: mag?.clave_ex || "",
        clasi: mag?.clasi || "",
        receta: !!mag?.receta,
        refri: mag?.refri || false,
        infoDesa: mag?.infoDesa || "",
        tipoF: mag?.tipoF || "",
        caducidad: mag?.caducidad || 0,
        comInt: mag?.comInt || "",
        excl: mag?.excl || false,
        presentacion: mag?.presentacion || "",
        comClie: mag?.comClie || "",
        asesor: mag?.asesor || "",
        comeAsesor: mag?.comeAsesor || "",
        envases: mag?.envases.split(', ') || [],
    };
}

export function validationSchemass() {
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
        envases: Yup.array().of(Yup.string()).nullable(),
    });
}