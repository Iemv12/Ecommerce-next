import { useState } from 'react'
import { Form, Button} from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { login } from '../../../api/user'
import { error } from '../../../middleware/formMessage'

export default function Login({showRegisterForm, onCloseModal}) {

    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: initialValue(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true)
            const response = await login(formData)
            if(response?.jwt){
                console.log(response)
                onCloseModal()
                toast.success("Sesion Iniciada")
            }else{
                const message = response.message[0].messages[0].message
                let errorMessage = error(message)
                toast.error(errorMessage)
            }
            setLoading(false)
        }
    })

    return (
        <Form className="login-form" onSubmit={formik.handleSubmit}>
            <Form.Input name="identifier" type="text" placeholder="Correo Electronico" onChange={formik.handleChange} error={formik.errors.identifier}/>
            <Form.Input name="password" type="password" placeholder="Contraseña" onChange={formik.handleChange} error={formik.errors.password}/>
            <div className="actions">
                <Button type="button" basic onClick={showRegisterForm}>Registrarse</Button>
                <div>
                    <Button className="submit" type="submit" loading={loading}>Iniciar Sesion</Button>
                    <Button type="button">
                        ¿Olvidaste tu contraseña?
                    </Button>
                </div>
            </div>
        </Form>
    )
}

function initialValue() {
    return {
        identifier: '',
        password: '',
    }
}

function validationSchema() {
    return {
        identifier: Yup.string().required().email(),
        password: Yup.string().required().min(6),
    }
}