import { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { register } from '../../../api/user'
import { toast } from 'react-toastify'

export default function Register({ showLoginForm }) {

    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: initialValue(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true)
            const response = await register(formData)
            if(response?.jwt){
                toast.success("Registro exitoso")
                showLoginForm()
            }else {
                const message = response.message[0].messages[0].message
                let errorMessage = error(message)
                toast.error(errorMessage)
            }
            setLoading(false)
        }
    })

    return (
        <Form className="login-form" onSubmit={formik.handleSubmit}>
            <Form.Input name="name" type="text" placeholder="Nombres" onChange={formik.handleChange} error={formik.errors.name} />
            <Form.Input name="lastname" type="text" placeholder="Apellidos" onChange={formik.handleChange} error={formik.errors.lastname} />
            <Form.Input name="username" type="text" placeholder="Nombre Usuario" onChange={formik.handleChange} error={formik.errors.username}/>
            <Form.Input name="email" type="text" placeholder="Correo Electronico" onChange={formik.handleChange} error={formik.errors.email}/>
            <Form.Input name="password" type="password" placeholder="Contraseña" onChange={formik.handleChange} error={formik.errors.password}/>
            <div className="actions">
                <Button type="button" onClick={showLoginForm} basic>Iniciar Sesion</Button>
                <Button type="submit" className="submit" loading={loading}>
                    Registrar
                </Button>
            </div>
        </Form>
    )
}

function initialValue() {
    return {
        name: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
    }
}

function validationSchema() {
    return {
        name: Yup.string().required(),
        lastname: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6),
    }
}

function error(message){
    switch (message) {
        case "Email is already taken.":
            return "Ya hay un usuario con este Email"
        default:
            return "Error, intente la accion mas tarde";
    }
}