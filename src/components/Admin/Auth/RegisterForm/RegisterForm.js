import React, { useState } from 'react';
import { Form, Modal } from 'semantic-ui-react';
import './RegisterForm.scss';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './RegisterForm.form';
import { Auth } from '../../../../api';

const authController = new Auth();

export function RegisterForm(props) {
  const { openLogin } = props;
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar si el modal está abierto

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setError('');
        await authController.register(formValue);
        openLogin();
      } catch (error) {
        setError('Error en el servidor');
      }
    },
  });

  return (
    <Form className="register-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="email"
        placeholder="Correo electrónico"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <Form.Input
        name="repeatPassword"
        type="password"
        placeholder="Confirmar Contraseña"
        onChange={formik.handleChange}
        value={formik.values.repeatPassword}
        error={formik.errors.repeatPassword}
      />

      {/* Botón para abrir el modal */}
      <span className="info-button"
        onClick={() => setModalOpen(true)}>
        Ver Políticas de privacidad
      </span>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        size="small"
      >
        <Modal.Header>Políticas de privacidad</Modal.Header>
        <Modal.Content>
          <p>
            <h3>TÉRMINOS Y CONDICIONES</h3>
            <h5>El presente acuerdo regirá la relación contractual entre usted y OMICRONLAB, S.A. DE C.V., cuya dirección electrónica es: https://kaapa-frontend.azurewebsites.net/ , de la cual es titular “OMICRONLAB, S.A. DE C.V.”, con domicilio en la Calle Del Refugio , con teléfono (81)1522 2896.
              <br />La utilización de la página web por parte de cualquier persona, le atribuye la calidad de usuario y ello implica su adhesión plena e incondicional a estos TÉRMINOS Y CONDICIONES; en consecuencia, es indispensable que el usuario los lea previamente y los evalúe de forma cuidadosa, de tal manera que esté consciente de que se sujeta a ellos.
              <br />Si en cualquier momento el usuario no estuviera de acuerdo total o parcialmente con estos TÉRMINOS Y CONDICIONES, deberá abstenerse inmediatamente de usar la página web en cualquiera de sus partes o secciones.
              La sola utilización de la página web le otorga al público la calidad de usuario, misma que implica la plena aceptación de todas y cada una de las estipulaciones de OMICRONLAB, S.A. DE C.V.
            </h5>
            <h4>OBJETO</h4>
            <h5 >A través de la página web https://kaapa-frontend.azurewebsites.net/ facilita a los usuarios el acceso a información diversa proporcionada por OMICRONLAB, S.A. DE C.V., o por personas vinculadas a dicha información de manera directa o indirecta.
              <br />El usuario reconoce que el uso de la página web no le implica ningún derecho de propiedad sobre el mismo, cualquiera de sus elementos o contenidos.
              <br />OMICRONLAB, S.A. DE C.V., se reserva el derecho a modificar en cualquier momento y sin aviso previo la presentación, configuración, información, contenidos y en general cualquier parte o aspecto relacionado directa o indirectamente con la página web.
            </h5>
            <h4>CONTENIDOS</h4>
            <h5>La página web https://kaapa-frontend.azurewebsites.net/ tiene a su vez enlaces o “links” que dirigen a diversos sitios web de terceros, así como contrataciones ante terceros que le brindan un servicio, por lo tanto el usuario al utilizar el sitio web, debe tener en cuenta que acepta las políticas de privacidad de los terceros con los que OMICRONLAB, S.A. DE C.V. guarda una relación contractual, toda vez que las mismas son necesarias para que OMICRONLAB, S.A. DE C.V. pueda cumplir con su objeto y brindar al usuario un mejor servicio, por lo cual, el usuario, acepta toda la responsabilidad sobre la información o datos personales que ha proporcionado y libera a OMICRONLAB, S.A. DE C.V., de cualquier responsabilidad derivada del uso de sus datos personales.
              <br />Por lo referido en el párrafo inmediato anterior, el usuario expresamente renuncia por medio de la aceptación de los presentes Términos y Condiciones a llevar a cabo cualquier, acción, demanda, denuncia o reclamación alguna contra OMICRONLAB, S.A. DE C.V., por cualquier información que el usuario haya proporcionado voluntariamente en la página web.
              <br />El usuario se obliga a hacer uso correcto del sitio y de los contenidos, se compromete a utilizar la página web y los contenidos conforme a las leyes aplicables, a lo dispuesto en estos TÉRMINOS Y CONDICIONES y con respeto al orden público. El usuario se obliga utilizar el sitio web y cualquier contenido o aspecto relacionado con él, de una manera en que no lesione derechos o intereses de OMICRONLAB, S.A. DE C.V., de personas vinculadas a éste directa o indirectamente o de terceros. el usuario utilizará el sitio y/o los contenidos de una manera en la que no los dañe, inutilice, deteriore o menoscabe total o parcialmente.
            </h5>
            <h4>MEDIOS PARA OBTENCIÓN DE CONTENIDOS</h4>
            <h5>El usuario deberá abstenerse de obtener o intentar obtener información, mensajes, gráficos, dibujos, archivos de sonido y/o imagen, fotografías, grabaciones, software y en general, cualquier clase de material accesible a través del sitio o de los contenidos.
              <br />Se podrá hacer uso de los contenidos y los elementos que se encuentran en el sitio empleando para ello únicamente los medios o procedimientos establecidos e indicados dentro del mismo y previa notificación de autorización.
            </h5>
            <h4>USO CORRECTO DE LOS CONTENIDOS</h4>
            <h5>El usuario se obliga a usar los contenidos y los elementos utilizados en la página web de forma diligente, correcta y lícita, y en particular, se compromete a abstenerse de: (a) utilizar los contenidos de forma, con fines o efectos contrarios a la ley, al orden público y a lo establecido por OMICRONLAB, S.A. DE C.V., para el uso de este sitio; (b) copiar, difundir, modificar, reproducir, distribuir o utilizar de cualquier forma con o sin fines de lucro los contenidos y los elementos utilizados en la página web a menos que se cuente con la autorización expresa y por escrito. (c) modificar o manipular las marcas, logotipos, avisos comerciales, nombres comerciales y signos distintivos en general de OMICRONLAB, S.A. DE C.V., del sitio o de las personas vinculadas directa o indirectamente. (d) suprimir, eludir o modificar los contenidos y los elementos utilizados en el sitio, así como los dispositivos técnicos de protección, o cualquier mecanismo o procedimiento establecido en el sitio.
              <br />OMICRONLAB, S.A. DE C.V., declara que todos los contenidos y los elementos utilizados en el sitio se encuentran debidamente registrados y protegidos bajo las autoridades y leyes correspondientes en México. El usuario se obliga a respetar todos los derechos de la Propiedad Intelectual sobre los contenidos y los elementos utilizados en el sitio de los que es titular así como todo derecho sobre invenciones (patentadas o no), diseños industriales, modelos de utilidad, información confidencial, nombres comerciales, avisos comerciales, reservas de derechos, nombres de dominio, así como todo tipo de derechos patrimoniales sobre obras y creaciones protegidas por derechos de autor y demás formas de propiedad industrial o intelectual reconocida o que lleguen a reconocer las leyes correspondientes.
              <br />El usuario entiende que su inactividad en el sitio web, no extinge cualquier derecho o acción que tenga OMICRONLAB, S.A. DE C.V. respecto de la información ya proporcionada, por lo que en ningún momento deberá interpretarse como oposición a los presentes Términos y Condiciones.
            </h5>
            <h4>CONTENIDO DE SALUD</h4>
            <h5>Los contenidos en la página web, en los laboratorios y de salud proporcionados por OMICRONLAB, S.A. DE C.V., son para información general y no deberán utilizarse como sustitución al tratamiento, diagnóstico y/o consejo médico. El usuario deberá aclarar cualquier duda médica o de salud con su médico tratante. OMICRONLAB, S.A. DE C.V., no asume ninguna responsabilidad por el riesgo que pudiera ocasionarle la información contenida en dicha página, debe tomar en cuenta que la información en la página web se actualiza de manera periódica y podría no tener la información de salud más actualizada. El uso de la página web no crea ningún tipo de relación con el usuario, por lo que OMICRONLAB, S.A. DE C.V., no está obligado a dar seguimiento a los usuarios.</h5>
            <h4>UTILIZACIÓN DEL SITIO, DE LOS CONTENIDOS Y DE LOS CONTENIDOS BAJO LA EXCLUSIVA RESPONSABILIDAD DEL USUARIO</h4>
            <h5>Por el sólo hecho de acceder a la página web, el usuario reconoce y acepta que el uso del mismo y de los contenidos, es bajo su exclusiva y estricta responsabilidad, por lo que el OMICRONLAB, S.A. DE C.V., no será en ningún momento y bajo ninguna circunstancia, responsable por cualquier desperfecto o problema que se presentara.</h5>
            <h4>OBLIGACIÓN DE OBSERVAR LAS INSTRUCCIONES</h4>
            <h5>El usuario se compromete a seguir al pie de la letra cualquier instrucción impartida por el personal autorizado que se encuentre relacionado con la página web, en referencia con cualquier mecanismo o procedimiento establecido para usar la página web y los contenidos.</h5>
            <h4>RESPONSABILIDAD POR DAÑOS Y PERJUICIOS</h4>
            <h5>El usuario es responsable de cualquier daño y/o perjuicio de cualquier naturaleza que ocasionara por incumplir estos TERMISMOS Y CONDICIONES / AVISO DE PRIVACIDAD o cualquier normatividad aplicable, por lo que deslinda a OMICRONLAB, S.A. DE C.V., de toda responsabilidad civil, penal, administrativa o de cualquier otra índole.
              <br />Sin perjuicio de lo establecido en el párrafo anterior, en el supuesto de que OMICRONLAB, S.A. DE C.V., fuera sancionado o condenado por autoridad competente en cualquier procedimiento relacionado con responsabilidad civil, penal, administrativa o de cualquier otra índole, notificará al usuario responsable, quien deberá pagar a OMICRONLAB, S.A. DE C.V., la cantidad a que haya sido condenado a cubrir, así como las costas, honorarios y demás gastos en que se hubiera incurrido, dentro de los 15 días naturales siguientes a la notificación. En caso de retraso del pago en el término indicado, El usuario se obliga a pagar a OMICRONLAB, S.A. DE C.V. por concepto de pena convencional, una cantidad equivalente a la suerte principal.
            </h5>
            <h4>OTRAS DISPOSICIONES</h4>
            <h5>Ley aplicable y jurisdicción. En todo lo relacionado con la interpretación y cumplimiento de lo aquí dispuesto, los usuarios aceptan someterse a las leyes aplicables y a la jurisdicción de los tribunales competentes en Monterrey, Nuevo León., renunciado a cualquier otra jurisdicción que por razón de sus domicilios presentes o futuros, o por cualquiera otra razón pudiese corresponderles.</h5>
            <h4>DISPOSICIONES INEFICACES</h4>
            <h5>En caso de que alguno de los TÉRMINOS Y CONDICIONES / AVISO DE PRIVACIDAD aquí expresados sea considerado no ejecutable o se declare nulo o inválido de acuerdo con la legislación aplicable, éste será sustituido por un término o condición que sea válido y que pueda cumplir con mayor rigor el objetivo de la disposición no ejecutable o que haya sido declarada nula o inválida. Los demás términos y condiciones continuarán en plena vigencia.</h5>
            <h4>DERECHOS</h4>
            <h5>Cualquier derecho que no se haya conferido expresamente en este documento se entiende reservado a OMICRONLAB, S.A. DE C.V.
            <br/>En el momento en que el usuario “acepta” los presentes Términos y Condiciones, entiende que ellos producirán los mismos efectos que las leyes mexicanas otorgan a los documentos que constituyen prueba plena.

              <br/><br/>Atentamente.
              <br/>OMICRON LAB, S.A. DE C.V.</h5>
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Form.Button onClick={() => setModalOpen(false)}>
            Cerrar
          </Form.Button>
        </Modal.Actions>
      </Modal>


      <Form.Checkbox
        name="conditionsAccepted"
        label="He leído y acepto las políticas de privacidad"
        onChange={(_, data) =>
          formik.setFieldValue('conditionsAccepted', data.checked)
        }
        checked={formik.values.conditionsAccepted}
        error={formik.errors.conditionsAccepted}
      />
      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Crear Usuario
      </Form.Button>
      <p className="register-form_error">{error}</p>
    </Form>
  );
}