import * as Yup from "yup";

export function initialValues(ope) {
    return {
        folio_Op: ope?.folio_Op || 0,
        email: ope?.email || "",
        cardcode: ope?.cardcode || "",
        base: ope?.base || "",
        activos: ope?.activos || "",
        especialidad: ope?.especialidad || "",
        padecimiento: ope?.padecimiento || "",
        necesita_formula: ope?.necesita_formula || "",
        existe: ope?.existe || "",
        base_ex: ope?.base_ex || "",
        clave_ex: ope?.clave_ex || "",
        clasi: ope?.clasi || "",
        receta: ope?.receta || "",
        refri: ope?.refri || "",
        tipoF: ope?.tipoF || "",
        caducidad: ope?.caducidad || 0,
        comInt: ope?.comInt || "",
        excl: ope?.excl || "",
        presentacion: ope?.presentacion || "",
        sIyD: ope?.sIyD || "",
        comClie: ope?.comClie || "",
        asesor: ope?.asesor || "",
        infoDes: ope?.infoDes || '',
        precioUni: ope?.precioUni,
        precio1: ope?.precio1,
        precio2: ope?.precio2,
        precio3: ope?.precio3,
        precio4: ope?.precio4,
        precio5: ope?.precio5,
        precio6: ope?.precio6,
        precio7: ope?.precio7,
        precio8: ope?.precio8,
    };
}

export function validationSchema() {
    return Yup.object({
        folio_Op: Yup.number().required(true),
    });
}