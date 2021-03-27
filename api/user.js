import { BASE_PATH } from "../utils/constants"
import { authFetch } from "../utils/fetch"

export async function registerApi(user){
    try {
        const url = `${BASE_PATH}/auth/local/register`
        const params = {
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(user)
        }

        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function loginApi(user){
    try {
        const url = `${BASE_PATH}/auth/local`
        const params = {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(user)
        }
        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function forgotPasswordApi(email){
    try {
        const url = `${BASE_PATH}/auth/forgot-password`
        const params = {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({email})
        }
        const response = await fetch(url, params)
        const result = await response.json()
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getMeApi(logout){
    try {
        const url = `${BASE_PATH}/users/me`
        const result = await authFetch(url, null, logout)
        return result ? result : null
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function updateMeApi(id, data, logout){
    try {
        const url = `${BASE_PATH}/users/${id}`
        const params = {
            method: 'PUT',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        }
        const result = await authFetch(url, params, logout)
        return result ? result : null
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function updateEmailApi(id, email, logout){
    try {
        const url = `${BASE_PATH}/users/${id}`
        const params = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email})
        }
        const result = await authFetch(url, params, logout)
        console.log(result)
        return result ? result : null
    } catch (error) {
        console.log(error)
        return null
    }
}