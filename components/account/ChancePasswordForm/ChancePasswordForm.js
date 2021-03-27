import { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { updatePasswordApi } from '../../../api/user'

export default function ChancePasswordForm({user, logout}) {

    const [loading, setloading] = useState(false)

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) =>{
            setloading(true)
            const result = await updatePasswordApi(user.id, formData.password, logout)
            if(!result){
                toast.error("Error al actualizar contraseña")
            } else{
                toast.success("Contraseña actualizada")
                formik.resetForm()
            }
            setloading(false)
        }
    })

    return (
        <div className="chance-password-form" onSubmit={formik.handleSubmit}>
            <h4>Cambiar tu contraseña</h4>
            <Form>
                <Form.Group widths="equal">
                    <Form.Input type="password" name="password" placeholder="Nueva contraseña" onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password}/>
                    <Form.Input type="password" name="repeatPassword" placeholder="Confirmar nueva contraseña" onChange={formik.handleChange} value={formik.values.repeatPassword} error={formik.errors.repeatPassword}/>
                </Form.Group>
                <Button className="submit" loading={loading}>Actualizar</Button>
            </Form>
        </div>
    )
}


function initialValues(){
    return {
        password:'',
        repeatPassword:''
    }
}

function validationSchema(){
    return {
        password: Yup.string().required().min(6),
        repeatPassword: Yup.string().required().oneOf([Yup.ref("password")],"Passwords must match")
    }
}