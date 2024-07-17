import * as Yup from 'yup';

export function initialValuesCancel(soporte, Cancelpor) {
    return {

        MotivoCancel: soporte?.MotivoCancel || '',
        Cancelby: soporte && soporte.Cancelby ? soporte.Cancelby : Cancelpor

    }
}

export function validationSchemaCancel() {
    return Yup.object({
        MotivoCancel: Yup.string().required("Ingresa el motivo de cancelación")
    })
}