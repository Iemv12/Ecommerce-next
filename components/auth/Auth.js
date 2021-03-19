import { useState } from 'react'
import Login from './LoginForm'
import Register from './RegisterForm'

export default function Auth({onCloseModal, setTitleModal}) {
    const [showLogin, setShowLogin] = useState(false)

    const showLoginForm = () => {
        setShowLogin(true)
        setTitleModal("Login")
    }

    const showRegisterForm = () => {
        setShowLogin(false)
        setTitleModal("Register")
    }

    return showLogin ? <Login showRegisterForm={showRegisterForm}/> : <Register showLoginForm={showLoginForm}/>
}
