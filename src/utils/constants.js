const SERVER_IP = "https://backend-kappa.onrender.com";
export const ENV = {
    BASE_PATH: `https://backend-kappa.onrender.com`,
    BASE_API: `https://backend-kappa.onrender.com/api/v1`,
    API_ROUTES:{
        REGISTER: "auth/register",
        LOGIN: "auth/login",
        REFRESH_ACCESS_TOKEN: "auth/refresh_acces_token",
        USER_ME: "user/me",
        USER: "user",
        USERS: "users",
        MENU: "menu",
        COURSE: "course",
        NEWSLETTER: "newsletter",
        BLOG: "post",
        MAG: "mag",
    },
    JWT: {
        ACCESS: "access",
        REFRESH: "refresh",
    },
}