import * as Yup from "yup";



export function initialValues(user) {
    return {
        avatar: user?.avatar || "",
        fileAvatar: null,
        firstname: user?.firstname || "",
        lastname: user?.lastname || "",
        email: user?.email || "",
        role: user?.role || "",
        password: "",
    };
}

export function validationSchema(user) {
    return Yup.object({
        email: Yup.string().email(true).required(true),
        role: Yup.string().required(true),
        password: user?.password ? Yup.string() : Yup.string().required(true)
    });
}