import useAuth from '../../../hooks/useAuth'
import { useState, useEffect} from 'react'
import { getAddressApi } from '../../../api/address'
import { Grid, Button } from 'semantic-ui-react'
import { map, size} from 'lodash'

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
                            <Address address={address}/>
                        </Grid.Column>
                    ))}
                </Grid>
            )}
        </div>
    )
}


function Address({address}){

    const {title, name, address: addressTemp, state, city, postalCode, phone} = address

    return (
        <div className="address">
            <p>{title}</p>
            <p>{name}</p>
            <p>{addressTemp}</p>
            <p>{state}, {city}, {postalCode}</p>
            <p>{phone}</p>
            <div className="actions">
                <Button primary>Editar</Button>
                <Button>Eliminar</Button>
            </div>
        </div>
    )
}