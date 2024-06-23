'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/auth'

const LoginLinks = () => {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <div className="hidden  right-0 px-6 py-4 sm:block">
            {user ? (
                <Link
                    href="/dashboard"
                    className="bg-primary hover:bg-primary-dark text-white text-sm font-bold py-2 px-4 rounded-full inline-block mb-2 sm:inline-block sm:mb-0e"
                >
                    Área Personal
                </Link>
            ) : (
                <>
                    <Link
                        href="/login"
                        className="bg-primary hover:bg-primary-dark text-white text-sm font-bold py-2 px-4 rounded-full inline-block mb-2 sm:inline-block sm:mb-0"
                    >
                        Acceder
                    </Link>

                    <Link
                        href="/register"
                        className="bg-primary hover:bg-primary-dark text-white text-sm font-bold py-2 px-4 rounded-full inline-block mb-2 sm:inline-block sm:mb-0 ml-2"
                    >
                        Registrar
                    </Link>
                </>
            )}
        </div>
    )
}

export default LoginLinks
