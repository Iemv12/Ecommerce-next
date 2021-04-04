import useAuth from '../../../hooks/useAuth'
import { useState, useEffect} from 'react'
import { getAddressApi, deleteAddresApi } from '../../../api/address'
import { Grid, Button } from 'semantic-ui-react'
import { map, size} from 'lodash'
import { toast } from 'react-toastify'

export default function ListAddress({reloadAddress, setReloadAddress}) {
    const [addresses, setAddresses] = useState(null)

    const {auth, logout} = useAuth()

    useEffect(()=>{
        (async () => {
            const response = await getAddressApi(auth.idUser, logout)
            setAddresses(response || [])
            setReloadAddress(false)
        })()
    },[reloadAddress])

    if(!addresses) return null

    return (
        <div className="list-address">
            {size(addresses) === 0 ? (
                <h3>No hay ninguna direccion creada</h3>
            ) : (
                <Grid>
                    {map(addresses, (address) => (
                        <Grid.Column key={address.id} computer={4} tablet={8} mobile={16}>
                            <Address setReloadAddress={setReloadAddress} address={address} logout={logout}/>
                        </Grid.Column>
                    ))}
                </Grid>
            )}
        </div>
    )
}


function Address({address, logout, setReloadAddress}){

    const {id, title, name, address: addressTemp, state, city, postalCode, phone} = address

    const [loadingDelete, setLoadingDelete] = useState(false)

    const deleteAddress = async () => {
        setLoadingDelete(true)
        const response = await deleteAddresApi(id, logout)
        if(response){
            setReloadAddress(true)
            toast.success("Direccion eliminada")
        }else toast.error("Error al eliminar la direccion")
        setLoadingDelete(false)
    }

    return (
        <div className="address">
            <p>{title}</p>
            <p>{name}</p>
            <p>{addressTemp}</p>
            <p>{state}, {city}, {postalCode}</p>
            <p>{phone}</p>
            <div className="actions">
                <Button primary>Editar</Button>
                <Button onClick={deleteAddress} loading={loadingDelete}>Eliminar</Button>
            </div>
        </div>
    )
}