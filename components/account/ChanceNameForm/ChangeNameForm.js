import { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { updateMeApi } from '../../../api/user'

export default function ChangeNameForm({user, logout, setReloadUser}) {

    const { name, lastname, id } = user

    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: initialValues(name, lastname),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true)
            const response = await updateMeApi(id, formData, logout)
            if(!response){
                toast.error("Error al actualizar nombres y apellidos")
            }else{
                setReloadUser(true)
                toast.success("Nombres y apellidos actualizados")
            }
            setLoading(false)
        }
    })

    return (
        <div className="change-name-form">
            <h4>Cambia tus nombres y apellidos</h4>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group widths="equal">
                    <Form.Input name="name" placeholder="Tus nuevos nombre" onChange={formik.handleChange} value={formik.values.name} error={formik.errors.name}/>
                    <Form.Input name="lastname" placeholder="Tus nuevos apellidos" onChange={formik.handleChange} value={formik.values.lastname} error={formik.errors.lastname}/>
                </Form.Group>
                <Button loading={loading} className="submit">Actualizar</Button>
            </Form>
        </div>
    )
}

function initialValues(name="", lastname="") {
    return {
        name,
        lastname
    }
}

function validationSchema() {
    return {
        name: Yup.string().required(),
        lastname: Yup.string().required()
    }
}