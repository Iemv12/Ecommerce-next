import React, { useState, useEffect } from 'react'
import BasicLayout from "../layouts/BasicLayout"
import { getGameByUrlApi } from '../api/games'
import useCart from '../hooks/useCart'
import SummaryCart from '../components/cart/SummaryCart/SummaryCart'
import AddressShipping from '../components/cart/AddressShipping/AddressShipping'

export default function Cart() {
    const { getProductsCart } = useCart()
    const products = getProductsCart()

    return !products ? <EmptyCart/> : <FullCart products={products}/>
}


function EmptyCart() {
    return (
        <BasicLayout className="empty-cart">
            <h2>No hay productos en el carrito</h2>
        </BasicLayout>
    )
}

function FullCart({products}) {
    const [productsData, setProductsData] = useState(null)
    const [reloadCart, setReloadCart] = useState(false)
    const [address, setAddress] = useState(null)
    useEffect(() => {
        (async () => {
            const productsTemp = []
            for await (const product of products){
                const data = await getGameByUrlApi(product)
                productsTemp.push(data)
            }
            setProductsData(productsTemp)
        })()
        setReloadCart(false)
    }, [reloadCart])
    return (
        <BasicLayout className="empty-cart">
            <SummaryCart products={productsData} setReloadCart={setReloadCart} reloadCart={reloadCart}/>
            <AddressShipping setAddress={setAddress}/>
        </BasicLayout>
    )
}