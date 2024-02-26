import * as Yup from "yup";

export function initialValues(post){
    return{
        title: post?.title||"",
        miniature: post?.miniature || "",
        file: null,
        content: post?.content ||"",
        path: post?.path || ""
    };
}

export function validationSchema(){
    return Yup.object({
        title: Yup.string().required(true),
        miniature: Yup.string().required(true),
        content: Yup.string().required(true),
        path: Yup.string().required(true),
    })
}