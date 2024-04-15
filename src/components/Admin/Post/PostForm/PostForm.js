import React, { useCallback } from 'react';
import "./PostForm.scss";
import { Form, Image } from "semantic-ui-react"
import { useDropzone } from "react-dropzone"
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./PostForm.form";
import { Editor } from "@tinymce/tinymce-react";
import { Post } from "../../../../api"
import { useAuth } from "../../../../hooks"
import { ENV } from "../../../../utils"

const postController = new Post();

export function PostForm(props) {
  const { onClose, onReload, post } = props;
  const { accessToken } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(post),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (post) {
          await postController.updatePost(accessToken, post._id, formValue);
        } else {
          await postController.createPost(accessToken, formValue);
        }
        onReload();
        onClose();
      } catch (error) {
        console.error(error)
      }
    }
  });

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    formik.setFieldValue("miniature", URL.createObjectURL(file))
    formik.setFieldValue("file", file);
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpg, image/png",
    onDrop
  });

  const getMiniature = () => {
    if (formik.values.file) {
      return formik.values.miniature;
    } else if (formik.values.miniature) {
      return `${ENV.BASE_PATH}/${formik.values.miniature}`;
    }
    return null;
  };

  return (
    <Form className='post-form' onSubmit={formik.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input name="title" placeholder="Titulo del Post" onChange={formik.handleChange} value={formik.values.title} error={formik.errors.title} />
        <Form.Input name="path" placeholder="Enlace del Post" onChange={formik.handleChange} value={formik.values.path} error={formik.errors.path} />
      </Form.Group>

      <Editor
        apiKey='mxv7de660tfewx6wboe0balixi3w5ejlhx6zcm0k4mrwdwa3'
        init={{
          plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
        }}
        initialValue={formik.values.content}
        onBlur={(e) => formik.setFieldValue("content", e.target.getContent())}
      />


      { }
      <div className='post-form__miniature' {...getRootProps()}>
        <input {...getInputProps()} />
        {getMiniature() ? (
          <Image size='small' src={getMiniature()} />
        ) : (
          <div>
            <span>Arrastra la Imagen</span>
          </div>
        )
        }
      </div>
      <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
        {post ? "Actualziar Post" : "Crear Post"}
      </Form.Button>
    </Form>
  )
}
