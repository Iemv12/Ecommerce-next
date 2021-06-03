import React, { useState, useEffect } from 'react'
import { Grid, Button} from 'semantic-ui-react'
import { map, size } from 'lodash'
import Link from 'next/link'
import classNames from 'classnames'
import { getAddressApi } from '../../../api/address'
import useAuth from '../../../hooks/useAuth'

export default function AddressShipping({setAddress}) {

    const [addresses, setAddresses] = useState(null)
    const {logout, auth} = useAuth()
    const [addressActive, setAddressActive] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await getAddressApi(auth.idUser, logout)
            setAddresses(response || []);
        })()
    }, [])

    return (
        <div className="address-shipping">
            <div className="title">Direccion de envio</div>
            <div className="data">
                {size(addresses) === 0 ? (
                    <h3>No hay ninguna direccion creada -{" "}
                        <Link href="/account">
                            <a>Agregar tu primera direccion</a>
                        </Link>
                    </h3>
                ) : (
                    <Grid>
                        {map(addresses, (address)=> (
                            <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                                <Address address={address} setAddress={setAddress} addressActive={addressActive} setAddressActive={setAddressActive}/>
                            </Grid.Column>
                        ))}
                    </Grid>
                )}
            </div>
        </div>
    )
}

function Address({address,setAddress ,addressActive ,setAddressActive}) {

    const changeAddress = () => {
        setAddressActive(address._id)
        setAddress(address)
        console.log(addressActive)
    }

    return (
        <div className={classNames("address", {
            active: addressActive === address._id
            })}
            onClick={changeAddress}
        >
            <p>{address.title}</p>
            <p>{address.name}</p>
            <p>{address.address}</p>
            <p>{address.city}, {address.state}, {address.postalCode}</p>
            <p>{address.address}</p>
        </div>
    )
}