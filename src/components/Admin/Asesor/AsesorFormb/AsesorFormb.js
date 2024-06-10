import React from 'react'
import { Form, Container } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { initialValuesb, validationSchemab } from './AsesorFormb.form'
import { Mag } from '../../../../api'
import { useAuth } from '../../../../hooks'
import "./AsesorForm.scss";

const presentaciones = [
    { key: "7.5ML", text: "7.5 ML", value: "7.5 ML" },
    { key: "15ML", text: "15 ML", value: "15 ML" },
    { key: "30ML", text: "30 ML", value: "30 ML" },
    { key: "60ML", text: "60 ML", value: "60 ML" },
    { key: "120ML", text: "120 ML", value: "120 ML" },
    { key: "240ML", text: "240 ML", value: "240 ML" },
    { key: "480ML", text: "480 ML", value: "480 ML" },
    { key: "960ML", text: "960 ML", value: "960 ML" },
];

const bases = [
    { key: "Aceite", text: "Aceite", value: "Aceite" },
    { key: "Cloroformo", text: "Cloroformo", value: "Cloroformo" },
    { key: "Colodion", text: "Colodion", value: "Colodion" },
    { key: "Crema", text: "Crema", value: "Crema" },
    { key: "CremaLiquida", text: "Crema Liquida", value: "CremaLiquida" },
    { key: "Gel", text: "Gel", value: "Gel" },
    { key: "GelCrema", text: "Gel-Crema", value: "GelCrema" },
    { key: "HidraSilk", text: "HidraSilk", value: "HidraSilk" },
    { key: "Hidroalcoholica", text: "Hidroalcoholica", value: "Hidroalcoholica" },
    { key: "Jabon", text: "Jabon", value: "Jabon" },
    { key: "Locion", text: "Locion", value: "Locion" },
    { key: "LocionAcuosa", text: "Locion Acuosa", value: "LocionAcuosa" },
    { key: "LocionCapilar", text: "Locion Capilar", value: "LocionCapilar" },
    { key: "LocionCrema", text: "Locion Crema", value: "LocionCrema" },
    { key: "NutraSilk", text: "Nutra Silk", value: "NutraSilk" },
    { key: "NutraSilkCream", text: "Nutra Silk Cream", value: "NutraSilkCream" },
    { key: "OMIFGEL", text: "OMI F GEL", value: "OMIFGEL" },
    { key: "Pasta", text: "Pasta", value: "Pasta" },
    { key: "Rollon", text: "Roll on", value: "Rollon" },
    { key: "Shampoo", text: "Shampoo", value: "Shampoo" },
    { key: "SilkDryGel", text: "Silk Dry Gel", value: "SilkDryGel" },
    { key: "SilkSerum", text: "Silk Serum", value: "SilkSerum" },
    { key: "Suero", text: "Suero", value: "Suero" },
    { key: "Talco", text: "Talco", value: "Talco" },
    { key: "Unguento", text: "Unguento", value: "Unguento" },
    { key: "Vaselina", text: "Vaselina", value: "Vaselina" },
];


const magController = new Mag();

export function AsesorFormb(props) {
    const { onClose, onReload, mag } = props
    const { accessToken } = useAuth();
    const { user: { email, firstname, lastname } } = useAuth();
    const CorreoAsesor = email;
    const nombreCompleto = `${firstname} ${lastname}`;

    const formik = useFormik({
        initialValues: initialValuesb(mag, CorreoAsesor),
        validationSchema: validationSchemab(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const presentacionesSeleccionadad = formValue.presentacion;
                const presentacionesTexto = presentacionesSeleccionadad.join(', ');
                const data = {
                    cardcode: formValue.cardcode,
                    cliente: formValue.cliente,
                    asesor: formValue.asesor,
                    asesornom: nombreCompleto,
                    presentacion: presentacionesTexto,
                    clave_ex: formValue.clave_ex,
                    actividad: "cambio",
                    base: formValue.base,
                    base_ex: formValue.base_ex,
                    activos: formValue.activos,
                    necesita_muestra: formValue.necesita_muestra,
                };
                if (!mag) {
                    await magController.createMag(accessToken, data)
                } else {
                    console.log("Esto no debería de pasar");
                }
                onClose();
                onReload();
            } catch (error) {
                console.error(error);
            }
        }
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Container>
                <h3>Datos de Formula Existente</h3>
                <Form.Input label="Correo Asesor" name="asesor" placeholder="Correo de asesor" onChange={formik.handleChange} value={CorreoAsesor} />
                <Form.Input label="CardCode" name="cardcode" placeholder="CardCode del Cliente" onChange={formik.handleChange} value={formik.values.cardcode} error={formik.errors.cardcode} />
                <Form.Input label="Cliente" name="cliente" placeholder="Nombre del Cliente" onChange={formik.handleChange} value={formik.values.cliente} error={formik.errors.cliente} />
                <Form.Dropdown label="Base Existente" placeholder="Base Existente" options={bases} selection onChange={(_, data) => formik.setFieldValue("base_ex", data.value)} value={formik.values.base_ex} error={formik.errors.base_ex} />
                <Form.Input label="Clave Existente" name="clave_ex" placeholder="Clave Existente" onChange={formik.handleChange} value={formik.values.clave_ex} error={formik.errors.clave_ex} />
            </Container>
            <br />
            <Container>
                <h3>Base de Cambio y Presentaciones deseadas</h3>
                <Form.Dropdown label="Base Nueva" placeholder="Base Nueva" options={bases} selection onChange={(_, data) => formik.setFieldValue("base", data.value)} value={formik.values.base} error={formik.errors.base} />
                <Form.TextArea label="Activos" name="activos" placeholder="Ingresa los activos para la fórmula, con su porcentaje" onChange={formik.handleChange} value={formik.values.activos} error={formik.errors.activos} />
                <Form.Dropdown label="Presentaciones" placeholder="Presentaciones" fluid selection multiple options={presentaciones} onChange={(_, data) => formik.setFieldValue("presentacion", data.value)} value={formik.values.presentacion || []} error={formik.errors.presentacion} />
                <Form.Checkbox label='Necesita Muestra' name='necesita_muestra' onChange={(_, data) => formik.setFieldValue("necesita_muestra", data.checked)} checked={formik.values.necesita_muestra} error={formik.errors.necesita_muestra} />
                <Form.TextArea label="Comentarios" name="comeAsesor" placeholder="Comentarios" onChange={formik.handleChange} value={formik.values.comeAsesor} error={formik.errors.comeAsesor} />
            </Container>
            <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
                {mag ? "Revisar Cotización" : "Crear cotización"}
            </Form.Button>
        </Form>
    )
}
