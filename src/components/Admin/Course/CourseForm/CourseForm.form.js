import * as Yup from "yup";

export function initialValues(course){
    return{
        tittle: course?.tittle || "",
        miniature: course?.miniature || "",
        file: null,
        description: course?.description || "",
        url: course?.url || ""
    };
}

export function validationSchema(){
    return Yup.object({
        tittle: Yup.string().required(true),
        miniature: Yup.string().required(true),
        description: Yup.string().required(true),
        url: Yup.string().required(true),
    })
}