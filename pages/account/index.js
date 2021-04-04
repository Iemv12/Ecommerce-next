import BasicLayout from '../../layouts/BasicLayout'
import { Icon } from 'semantic-ui-react'
import useAuth from '../../hooks/useAuth'
import { useRouter } from 'next/router'
import { getMeApi } from '../../api/user'
import { useState, useEffect } from 'react'
import ChanceNameForm from '../../components/account/ChanceNameForm'
import ChanceEmailForm from '../../components/account/ChanceEmailForm'
import ChancePasswordForm from '../../components/account/ChancePasswordForm'
import BasicModal from '../../components/modal/BasicModal'
import AddressForm from '../../components/account/AddressForm'
import ListAddress from '../../components/account/ListAddress'

export default function index() {

    const [user, setUser] = useState(undefined)
    const [reloadAddress, setReloadAddress] = useState(false)

    const router = useRouter()
    const { auth, logout, setReloadUser } = useAuth()

    useEffect(()=>{
        (async () =>{
            const response = await getMeApi(logout)
            setUser(response || null)
        })()
    },[auth])

    if(user === undefined) return null
    if(!auth && !user){
        router.replace("/")
        return null
    }

    return (
        <BasicLayout className="account">
            <Configuration user={user} logout={logout} setReloadUser={setReloadUser}/>
            <Addresses reloadAddress={reloadAddress} setReloadAddress={setReloadAddress}/>
        </BasicLayout>
    )
}


function Configuration({user, logout, setReloadUser}){
    return(
        <div className="account__configuration">
            <div className="title">Configuracion</div>
            <div className="data">
                <ChanceNameForm setReloadUser={setReloadUser} user={user} logout={logout}/>
                <ChanceEmailForm setReloadUser={setReloadUser} user={user} logout={logout}/>
                <ChancePasswordForm user={user} logout={logout}/>
            </div>
        </div>
    )
}

function Addresses({reloadAddress, setReloadAddress}) {

    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState("")
    const [formModal, setFormModal] = useState(null)

    const openModal = (title) => {
        setTitleModal(title)
        setFormModal(<AddressForm setShowModal={setShowModal} setReloadAddress={setReloadAddress}/>)
        setShowModal(true)
    }

    return (
        <div className="account__addresses">
            <div className="title">
                Direcciones
                <Icon name="plus" onClick={()=>openModal("Nueva direccion")} link/>
            </div>
            <div className="data">
                <ListAddress reloadAddress={reloadAddress} setReloadAddress={setReloadAddress}/>
            </div>
            <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
                {formModal}
            </BasicModal>
        </div>
    )
}