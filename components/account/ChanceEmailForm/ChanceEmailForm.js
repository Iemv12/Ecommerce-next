import { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { updateEmailApi } from '../../../api/user'
import { toast } from 'react-toastify'

export default function ChanceEmailForm({setReloadUser ,user, logout}) {

    const { id, email } = user

    const [loading, setloading] = useState(false)

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setloading(true)
            const response = await updateEmailApi(id, formData.email, logout)
            if(!response || response?.statusCode === 400){
                toast.error("Error al actualizar el email")
            }else{
                setReloadUser(true)
                formik.handleReset()
                toast.success("Email actualizado")
            }
            setloading(false)
        }
    })

    return (
        <div className="change-email-form" onSubmit={formik.handleSubmit}>
            <h4>Cambia tu correo <span>(Correo actual: {email})</span></h4>
            <Form>
                <Form.Group widths="equal">
                    <Form.Input name="email" placeholder=" Tu nuevo correo" value={formik.values.email} onChange={formik.handleChange} error={formik.errors.email}/>
                    <Form.Input name="repeatEmail" placeholder=" Confirma tu nuevo correo" value={formik.values.repeatEmail} onChange={formik.handleChange} error={formik.errors.repeatEmail}/>
                </Form.Group>
                <Button className="submit" loading={loading}>
                    Actualizar
                </Button>
            </Form>
        </div>
    )
}


function initialValues(){
    return{
        email: '',
        repeatEmail: ''
    }
}

function validationSchema(){
    return{
        email: Yup.string().email().required(),
        repeatEmail: Yup.string().email().required("Field is required").oneOf([Yup.ref('email')], 'Email must match')
    }
}