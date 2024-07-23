
export const ENV = {
    //Conexion prod
    //BASE_PATH: `https://kaapa-backend.azurewebsites.net`,
    //BASE_API: `https://kaapa-backend.azurewebsites.net/api/v1`,
    //Conexion Local 
    //BASE_PATH: `http://localhost:8080`,
    //BASE_API: `http://localhost:8080/api/v1`,
    //Conexion QA
    BASE_PATH: `https://server-ashen-gamma.vercel.app`,
    BASE_API: `https://server-ashen-gamma.vercel.app/api/v1`,
    //Contenedor
    USUSARIOS: `https://kaapauploads.blob.core.windows.net`,
    DEFAULT: 'https://kaapauploads.blob.core.windows.net/avatar/default.jpg',
    TICKETSOPORTE: 'https://kaapauploads.blob.core.windows.net',
    API_ROUTES: {
        REGISTER: "auth/register",
        LOGIN: "auth/login",
        REFRESH_ACCESS_TOKEN: "auth/refresh_acces_token",
        USER_ME: "user/me",
        USER: "user",
        USERR: "userr",
        USERS: "users",
        MENU: "menu",
        COURSE: "course",
        NEWSLETTER: "newsletter",
        BLOG: "post",
        MAG: "mag",
        CANCELAR: "mag/cancelacion",
        MAGS: "mags",
        MAGI: "magi",
        MAGIS: "magis",
        SAVEMAG: "savemag",
        SAVEMAGI: "savemagi",
        SAVEMAGIS: "savemagis",
        SAVEOPE: "saveope",
        SAVEOPEI: "saveopei",
        SAVEOPEIS: "saveopeis",
        SAVECOME: "savecome",
        SAVECOMEI: "savecomei",
        SAVECOMEIS: "savecomeis",
        ENVASES: "envases",
        OPE: "ope",
        OPES: "opes",
        OPEI: "opei",
        OPEIS: "opeis",
        COME: "come",
        COMES: "comes",
        COMEI: "comei",
        COMEIS: "comeis",
        CONTA: "conta",
        CONTAS: "contas",
        CREDITO: "credito",
        CREDITOS: "creditos",
        CONTAR: "contar",
        CREDITOR: "creditor",
        PAGAR: "pagar",
        PAGOS: "pagos",
        ECONTA: "econta",
        ECREDITO: "ecredito",
        EPAGOS: "epagos",
        CREDTIOSS: "creditoss",
        PAGOSF: "pagosf",
        SOPORTE: "soporte",
        SOPORTES: "soportes",
        ASOPORTE: "asoporte",
        ASSOPORTE: "asignticket",
        CANCELSOPORTE: "soporte/cancelar",
        MARKFACTURAS: "consultafacturas",
        MARKPROMOS: "reportepromociones",
        MARKCATPROMOS: "categoriapromociones",
        EMARKFACTURAS: "econsultafacturas",
        EMARKPROMOS: "ereportepromociones",
        SISTEMAS: "usersoporte",
        COMMENTS: "comments",
        FEEDBACK: "feedback",
    },
    JWT: {
        ACCESS: "access",
        REFRESH: "refresh",
    },
}