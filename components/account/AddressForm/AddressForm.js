import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useAuth from '../../../hooks/useAuth'
import { createAddressApi, updateAddresApi } from '../../../api/address'
import { toast } from 'react-toastify'


export default function AddressForm({ setShowModal, setReloadAddress, newAddress, address }) {

    const [loading, setLoading] = useState(false)
    const { auth, logout } = useAuth()

    const formik = useFormik({
        initialValues: initialValues(address),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            newAddress
                ? await createAddres(formData)
                : await updateAddress(formData)
        }
    })

    const createAddres = async (formData) => {
        setLoading(true)
        const formDataTemp = {
            ...formData,
            users_permissions_user: auth.idUser
        }
        const response = await createAddressApi(formDataTemp, logout)

        if (!response) {
            toast.warning("Error al crear la direccion")
            setLoading(false)
        } else {
            formik.resetForm()
            toast.success("Direccion guardada correctamente!!!")
            setReloadAddress(true)
            setLoading(false)
            setShowModal(false)
        }
    }

    const updateAddress = async (formData) => {
        setLoading(true)
        const formDataTemp = {
            ...formData,
            users_permissions_user: auth.idUser
        }
        const response = await updateAddresApi(address.id, formDataTemp, logout)
        if (!response) {
            toast.warning("Error al actualizar la direccion")
            setLoading(false)
        } else {
            formik.resetForm()
            setReloadAddress()
            setLoading(false)
            toast.success("Direccion actualizada correctamente!!!")
            setShowModal(false)
        }
    }
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input
                name="title"
                type="text"
                label="Titulo de la direccion"
                placeholder="Titulo de la direccion"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.errors.title}
            />
            <Form.Group widths="equal">
                <Form.Input
                    name="name"
                    type="text"
                    label="Nombres y apellidos"
                    placeholder="Nombres y apellidos"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.errors.name}
                />
                <Form.Input
                    name="address"
                    type="text"
                    label="Direccion"
                    placeholder="Direccion"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.errors.address}
                />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input
                    name="city"
                    type="text"
                    label="Ciudad"
                    placeholder="Ciudad"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.errors.city}
                />
                <Form.Input
                    name="state"
                    type="text"
                    label="Estado/Provincia/Region"
                    placeholder="Estado/Provincia/Region"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    error={formik.errors.state}
                />
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Input
                    name="postalCode"
                    type="text"
                    label="Codigo postal"
                    placeholder="Codigo postal"
                    value={formik.values.postalCode}
                    onChange={formik.handleChange}
                    error={formik.errors.postalCode}
                />
                <Form.Input
                    name="phone"
                    type="text"
                    label="Numero de telefono"
                    placeholder="Numero de telefono"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.errors.phone}
                />
            </Form.Group>
            <div className="actions">
                <Button className="submit" type="submit" loading={loading}>
                    {newAddress
                        ? "Crear direccion"
                        : "Actualizar direccion"}
                </Button>
            </div>
        </Form>
    )
}

function initialValues(address) {
    return {
        title: address?.title || "",
        name: address?.name || "",
        address: address?.address || "",
        city: address?.city || "",
        state: address?.state || "",
        postalCode: address?.postalCode || "",
        phone: address?.phone || "",
    }
}

function validationSchema() {
    return {
        title: Yup.string().required(),
        name: Yup.string().required(),
        address: Yup.string().required(),
        city: Yup.string().required(),
        state: Yup.string().required(),
        postalCode: Yup.string().required(),
        phone: Yup.string().required(),
    }
}