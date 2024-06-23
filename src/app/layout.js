import { Nunito } from 'next/font/google'
import '@/app/global.css'
import Footer from '@/components/FooterComponent'
import Header from '@/components/Header'


const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap',
})

const RootLayout = ({ children }) => {
    return (
        <html lang="en" className={nunitoFont.className}>
            <body className="antialiased">
            
                <Header />
                {children}
                <Footer />
                </body>
        </html>
    )
}

export const metadata = {
    title: 'Nutribert',
}

export default RootLayout
