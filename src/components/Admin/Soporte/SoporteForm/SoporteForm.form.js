import * as Yup from "yup";

export function initialValues(soporte, email) {
    return {
        documentos: soporte?.documentos || "",
        fileDocumentos: null,
        servicio: soporte?.servicio || "",
        descripcion: soporte?.descripcion || "",
        dueno: soporte && soporte.dueno ? soporte.dueno : email,
        asignado: soporte?.asignado || "",
        estado: soporte?.estado || "",
        comentarios: soporte?.comentarios || ""
    };
}

export function validationSchema(soporte) {
    return Yup.object({
        servicio: Yup.string().required(true),
        descripcion: Yup.string().required(true),
    });
}