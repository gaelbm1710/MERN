import * as Yup from "yup";

export function initialValues(ope){
    return{
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
        infoDes: ope?.infoDes || "",
        tipoF: ope?.tipoF || "",
        caducidad: ope?.caducidad || 0,
        comInt: ope?.comInt || "",
        excl: ope?.excl || "",
        presentacion: ope?.presentacion || "",
        sIyD: ope?.sIyD || "",
        comClie: ope?.comClie || "",
        asesor: ope?.asesor || "",
        precioUni: ope?.precioUni || 0,
        precio1: ope?.precio1 || 0,
        precio2: ope?.precio2 || 0,
        precio3: ope?.precio3 || 0,
        precio4: ope?.precio4 || 0,
        precio5: ope?.precio5 || 0,
        precio6: ope?.precio6 || 0,
        precio7: ope?.precio7 || 0,
        precio8: ope?.precio8 || 0,
    };
}

export function validationSchema(){
    return Yup.object({
        folio_Op: Yup.number().required(true),
    });
}