import * as Yup from "yup";

export function initialValues(come) {
    return {
        folio_sCom: come?.folio_sCom,
        email: come?.email || "",
        cardcode: come?.cardcode || "",
        base: come?.base || "",
        activos: come?.activos || "",
        especialidad: come?.especialidad || "",
        padecimiento: come?.padecimiento || "",
        necesita_muestra: come?.necesita_muestra || true,
        existe: come?.existe || "",
        base_ex: come?.base_ex || "",
        clave_ex: come?.clave_ex || "",
        clasi: come?.clasi || "",
        receta: come?.receta || true,
        refri: come?.refri || true,
        infoDes: come?.infoDes || "",
        tipoF: come?.tipoF || "",
        caducidad: come?.caducidad || 0,
        comInt: come?.comInt || "",
        excl: come?.excl || "",
        presentacion: come?.presentacion || "",
        sIyD: come?.sIyD || "",
        comClie: come?.comClie || "",
        asesor: come?.asesor || "",
        precioUni: come?.precioUni || 0,
        precio1: come?.precio1 || 0,
        precio2: come?.precio2 || 0,
        precio3: come?.precio3 || 0,
        precio4: come?.precio4 || 0,
        precio5: come?.precio5 || 0,
        precio6: come?.precio6 || 0,
        precio7: come?.precio7 || 0,
        precio8: come?.precio8 || 0,
    };
}

export function validationSchema() {
    return Yup.object({
        folio_sCom: Yup.number().required(true),
    });
}