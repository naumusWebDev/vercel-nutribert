import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from '@/lib/axios'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchUser = async () => {
        try {
            const response = await axios.get('/api/user')
            setUser(response.data)
            setLoading(false)
        } catch (error) {
            if (error.response.status !== 409) throw error
            router.push('/verify-email')
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const csrf = () => axios.get('/api/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }) => {
        await csrf()
        setErrors([])

        try {
            await axios.post('/register', props)
            fetchUser()
        } catch (error) {
            if (error.response.status !== 422) throw error
            setErrors(error.response.data.errors)
        }
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        await csrf()
        setErrors([])
        setStatus(null)

        try {
            await axios.post('/login', props)
            fetchUser()
        } catch (error) {
            if (error.response.status !== 422) throw error
            setErrors(error.response.data.errors)
        }
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()
        setErrors([])
        setStatus(null)

        try {
            const response = await axios.post('/forgot-password', { email })
            setStatus(response.data.status)
        } catch (error) {
            if (error.response.status !== 422) throw error
            setErrors(error.response.data.errors)
        }
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()
        setErrors([])
        setStatus(null)

        try {
            const response = await axios.post('/reset-password', { token: params.token, ...props })
            router.push('/login?reset=' + btoa(response.data.status))
        } catch (error) {
            if (error.response.status !== 422) throw error
            setErrors(error.response.data.errors)
        }
    }

    const resendEmailVerification = async ({ setStatus }) => {
        try {
            const response = await axios.post('/email/verification-notification')
            setStatus(response.data.status)
        } catch (error) {
            // Manejar error si es necesario
        }
    }

    const logout = async () => {
        try {
            await axios.post('/logout')
            setUser(null)
            window.location.pathname = '/'
        } catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated)
        }
        if (window.location.pathname === '/verify-email' && user?.email_verified_at) {
            router.push(redirectIfAuthenticated)
        }
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        loading,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
