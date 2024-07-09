import * as Yup from "yup";

export function initialValues(mag) {
    return {
        folio_IyD: mag?.folio_IyD || 0,
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
        caducidad: mag?.caducidad,
        comInt: mag?.comInt || "",
        excl: mag?.excl || false,
        presentacion: mag?.presentacion || "",
        comClie: mag?.comClie || "",
        asesor: mag?.asesor || "",
        envases: mag?.envases || ""
    };
}

export function validationSchema() {
    return Yup.object({
        folio: Yup.number(),
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