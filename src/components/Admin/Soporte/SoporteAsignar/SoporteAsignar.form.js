import * as Yup from "yup"

export function initialValuess(soporte) {
    return {
        asignado: soporte?.asignado || "",
    }
}

export function validationSchemas() {
    return Yup.object({
        asignado: Yup.array().of(Yup.string()).nullable().required(true)
    })
}