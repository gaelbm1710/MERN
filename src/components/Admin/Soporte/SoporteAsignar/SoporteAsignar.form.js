import * as Yup from "yup"

export function initialValuess(soporte) {
    return {
        asignado: soporte ? soporte.asignado.split(', ') : '',
        prioridad: soporte?.prioridad || "Media"
    }
}

export function validationSchemas() {
    return Yup.object({
        asignado: Yup.array().of(Yup.string()).nullable()
    })
}