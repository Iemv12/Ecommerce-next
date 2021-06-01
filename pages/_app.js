import { useMemo, useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { setToken, getToken, removeToken } from '../api/token'
import AuthContext from "../context/AuthContext"
import CartContext from '../context/CartContext'
import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router'
import "../scss/global.scss"
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { getProductsCart, addProductCart } from '../api/cart'

export default function MyApp({ Component, pageProps }) {

  const [auth, setAuth] = useState(undefined)
  const [reloadUser, setReloadUser] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const token = getToken()
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id
      })
    } else {
      setAuth(null)
    }
    setReloadUser(false)
  }, [reloadUser])

  const login = (token) => {
    setToken(token)
    setAuth({
      token,
      idUser: jwtDecode(token).id
    })
  }

  const logout = () => {
    if (auth) {
      removeToken()
      setAuth(null)
      router.push("/")
    }
  }

  const addProduct = (product) => {
    if(auth){
      addProductCart(product)
    } else {
      toast.warning("Debe de iniciar sesion para comprar un producto")
    }
  }

  const authData = useMemo(() => (
    {
      auth,
      login,
      logout,
      setReloadUser,
    }
  ), [auth])

  const cartData = useMemo(()=>(
    {
      productsCart: 0,
      addProductCart: (product) => addProduct(product),
      getProductsCart,
      removeProductCart: () => null,
      removerAllProductsCart: () => null
    }
  ))

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </CartContext.Provider>
    </AuthContext.Provider>
  )
}