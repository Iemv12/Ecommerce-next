import BasicLayout from '../../layouts/BasicLayout'
import useAuth from '../../hooks/useAuth'
import { useRouter } from 'next/router'
import { getMeApi } from '../../api/user'
import { useState, useEffect } from 'react'
import ChanceNameForm from '../../components/account/ChanceNameForm'
import ChanceEmailForm from '../../components/account/ChanceEmailForm'

export default function index() {

    const [user, setUser] = useState(undefined)

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
            </div>
        </div>
    )
}
