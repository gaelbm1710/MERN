import * as Yup from "yup";

export function initialValuesCancel(mag) {
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
        caducidad: mag?.caducidad || 0,
        comInt: mag?.comInt || "",
        excl: mag?.excl || false,
        presentacion: mag?.presentacion || "",
        comClie: mag?.comClie || "",
        asesor: mag?.asesor || "",
        comeAsesor: mag?.comeAsesor || "",
        precio1: mag?.precio1,
        precio2: mag?.precio2,
        precio3: mag?.precio3,
        precio4: mag?.precio4,
        precio5: mag?.precio5,
        precio6: mag?.precio6,
        precio7: mag?.precio7,
        precio8: mag?.precio8,
        MotivoCancel: mag?.MotivoCancel
    }
}
export function validationSchemaCancel(mag) {
    return Yup.object({
        MotivoCancel: Yup.string().required("Ingresa el motivo de cancelación")
    })
}