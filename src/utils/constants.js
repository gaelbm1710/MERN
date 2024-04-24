
export const ENV = {
    //Conexion prod
   BASE_PATH: `https://kaapa-backend.azurewebsites.net/`, 
   BASE_API: `https://kaapa-backend.azurewebsites.net/api/v1`,
    //Conexion Local
    //BASE_PATH: `http://localhost:8080`,
    //BASE_API: `http://localhost:8080/api/v1`,
    API_ROUTES:{
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
        MAGS: "mags",
        MAGI:"magi",
        MAGIS:"magis",
        OPE: "ope",
        OPES: "opes",
        OPEI:"opei",
        OPEIS:"opeis",
        COME: "come",
        COMES: "comes",
        COMEI: "comei",
        COMEIS: "comeis",
        CONTA: "conta",
        CONTAS: "contas",
        CREDITO: "credito",
        CREDITOS: "creditos",
        PAGOS: "pagos",
        SOPORTE: "soporte"
    },
    JWT: {
        ACCESS: "access",
        REFRESH: "refresh",
    },
}