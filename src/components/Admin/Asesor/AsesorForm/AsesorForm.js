import React from 'react'
import { Form, Container } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './AsesorForm.form'
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

const especialidades = [
    { key: "ANESTESIOLOGIA", text: "ANESTESIOLOGIA", value: "ANESTESIOLOGIA" },
    { key: "ANGEOLOG", text: "ANGEOLOG", value: "ANGEOLOG" },
    { key: "BARIATRA", text: "BARIATRA", value: "BARIATRA" },
    { key: "CARDIOLOGO", text: "CARDIOLOGO", value: "CARDIOLOGO" },
    { key: "CIRUJANOPLASTICO", text: "CIRUJANO PLASTICO", value: "CIRUJANOPLASTICO" },
    { key: "CLINICASPA", text: "CLINICA/SPA", value: "CLINICA/SPA" },
    { key: "COSMEATRA", text: "COSMEATRA", value: "COSMEATRA" },
    { key: "DENTISTA", text: "DENTISTA", value: "DENTISTA" },
    { key: "DERMACET", text: "DERMA CET", value: "DERMACET" },
    { key: "ENDOCRINOLOGO", text: "ENDOCRINOLOGO", value: "ENDOCRINOLOGO" },
    { key: "EPIDEMIOLOGO", text: "EPIDEMIOLOGO", value: "EPIDEMIOLOGO" },
    { key: "ESTETICAYLONGEVIDAD", text: "ESTETICA Y LONGEVIDAD", value: "ESTETICAYLONGEVIDAD" },
    { key: "ESTOMATOLOGO", text: "ESTOMATOLOGO", value: "ESTOMATOLOGO" },
    { key: "GASTROENTEROLOGO", text: "GASTROENTEROLOGO", value: "GASTROENTEROLOGO" },
    { key: "GERIATRIA", text: "GERIATRIA", value: "GERIATRIA" },
    { key: "GINECOLOGO", text: "GINECOLOGO", value: "GINECOLOGO" },
    { key: "HOMEOPATA", text: "HOMEOPATA", value: "HOMEOPATA" },
    { key: "MEDICINADELDEPORTE", text: "MEDICINA DEL DEPORTE", value: "MEDICINADELDEPORTE" },
    { key: "MEDICINAINTERNA", text: "MEDICINA INTERNA", value: "MEDICINAINTERNA" },
    { key: "MEDICODERMATOLOGO", text: "MEDICO DERMATOLOGO", value: "MEDICODERMATOLOGO" },
    { key: "MEDICOGENERAL", text: "MEDICO GENERAL", value: "MEDICOGENERAL" },
    { key: "MEDICO UROLOGO", text: "MEDICO UROLOGO", value: "MEDICOUROLOGO" },
    { key: "MEDICO VETERINARIO", text: "MEDICO VETERINARIO", value: "MEDICOVETERINARIO" },
    { key: "NUTRIOLOGO", text: "NUTRIOLOGO", value: "NUTRIOLOGO" },
    { key: "ODONTOLOGIA", text: "ODONTOLOGIA", value: "ODONTOLOGIA" },
    { key: "OFTALMOLOGO", text: "OFTALMOLOGO", value: "OFTALMOLOGO" },
    { key: "OTORINOLARINGOLOGO", text: "OTORINOLARINGOLOGO", value: "OTORINOLARINGOLOGO" },
    { key: "PEDIATRA", text: "PEDIATRA", value: "PEDIATRA" },
    { key: "PODOLOGO", text: "PODOLOGO", value: "PODOLOGO" },
    { key: "PSIQUIATRIA", text: "PSIQUIATRIA", value: "PSIQUIATRIA" },
    { key: "RESIDENTEDERMA", text: "RESIDENTE DERMA", value: "RESIDENTEDERMA" },
    { key: "REUMATOLOGO", text: "REUMATOLOGO", value: "REUMATOLOGO" },
    { key: "TRAUMATOLOGO", text: "TRAUMATOLOGO", value: "TRAUMATOLOGO" },
];

const magController = new Mag();

export function AsesorForm(props) {
    const { onClose, onReload, mag } = props;
    const { accessToken } = useAuth();
    const { user: { email, firstname, lastname } } = useAuth();
    const CorreoAsesor = email;
    const nombreCompleto = `${firstname} ${lastname}`;

    const formik = useFormik({
        initialValues: initialValues(mag, CorreoAsesor, nombreCompleto),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const presentacionesSeleccionadad = formValue.presentacion;
                const presentacionesTexto = presentacionesSeleccionadad.join(', ');
                const data = {
                    cardcode: formValue.cardcode,
                    cliente: formValue.cliente,
                    asesor: CorreoAsesor,
                    asesornom: nombreCompleto,
                    base: formValue.base,
                    activos: formValue.activos,
                    especialidad: formValue.especialidad,
                    padecimiento: formValue.padecimiento,
                    necesita_muestra: formValue.necesita_muestra,
                    presentacion: presentacionesTexto,
                    actividad: "nueva",
                    comeAsesor: formValue.comeAsesor
                };

                if (!mag) {
                    await magController.createMag(accessToken, data);
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
        <Form onSubmit={formik.handleSubmit} className='form'>
            <Container className='form-cotizacion__primer'>
                <Form.Input label="CardCode" name="cardcode" placeholder="CardCode del Cliente" onChange={formik.handleChange} value={formik.values.cardcode} error={formik.errors.cardcode} />
                <Form.Input label="Cliente" name="cliente" placeholder="Nombre del Cliente" onChange={formik.handleChange} value={formik.values.cliente} error={formik.errors.cliente} />
                <Form.Dropdown label="Especialidad" placeholder="Especialidad" options={especialidades} selection onChange={(_, data) => formik.setFieldValue("especialidad", data.value)} value={formik.values.especialidad} error={formik.errors.especialidad} />
            </Container>
            <Container className='form-cotizacion__segundo'>
                <Form.Dropdown label="Base" placeholder="Base" options={bases} selection onChange={(_, data) => formik.setFieldValue("base", data.value)} value={formik.values.base} error={formik.errors.base} />
                <Form.TextArea label="Activos" name="activos" placeholder="Ingresa los activos para la fórmula, con su porcentaje" onChange={formik.handleChange} value={formik.values.activos} error={formik.errors.activos} />
                <Form.Dropdown label="Presentaciones" placeholder="Presentaciones" fluid selection multiple options={presentaciones} onChange={(_, data) => formik.setFieldValue("presentacion", data.value)} value={formik.values.presentacion || []} error={formik.errors.presentacion} />
                <Form.Input label="Padecimiento" name="padecimiento" placeholder="Padecimiento o intención de uso (p. ej. Ovario poliquístico o aparato/equipo)" onChange={formik.handleChange} value={formik.values.padecimiento} error={formik.errors.padecimiento} />
                <Form.TextArea label="Comentarios" name="comeAsesor" placeholder="Comentarios" onChange={formik.handleChange} value={formik.values.comeAsesor} error={formik.errors.comeAsesor} />
            </Container>
            <Container className='form-cotizacion__tercero'>
                <br />
                <Form.Checkbox label='Necesita Muestra' name='necesita_muestra' onChange={(_, data) => formik.setFieldValue("necesita_muestra", data.checked)} checked={formik.values.necesita_muestra} error={formik.errors.necesita_muestra} />
            </Container><br/>
            <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
                {mag ? "Revisar Cotización" : "Crear cotización"}
            </Form.Button>
        </Form>
    )
}
