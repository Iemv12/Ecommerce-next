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
import { getProductsCart, addProductCart, countProductsCart, removeProductCart } from '../api/cart'

export default function MyApp({ Component, pageProps }) {

  const [auth, setAuth] = useState(undefined)
  const [reloadUser, setReloadUser] = useState(false)
  const [reloadCard, setReloadCard] = useState(false)
  const [totalProductCart, setTotalProductCart] = useState(0)

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

  useEffect(()=> {
    setTotalProductCart(countProductsCart())
    setReloadCard(false)
  },[reloadCard, auth])

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
    const token = getToken()
    if(token){
      addProductCart(product)
      setReloadCard(true)
    } else {
      toast.warning("Debe de iniciar sesion para comprar un producto")
    }
  }


  const removeProduct = (product) => {
    const token = getToken()
    if(token){
      removeProductCart(product)
      setReloadCard(true)
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
      productsCart: totalProductCart,
      addProductCart: (product) => addProduct(product),
      getProductsCart,
      removeProductCart: (product) => removeProduct(product),
      removerAllProductsCart: () => null
    }
  ), [totalProductCart])

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