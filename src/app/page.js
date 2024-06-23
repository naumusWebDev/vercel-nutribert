
import Cta from '@/components/CallToAction'
import CardsSection from '@/components/Cards'
import Hero from '@/components/Hero'
import TestimonialsSection from '@/components/Testimonial'


export const metadata = {
    title: 'Nutribert',
}

const Home = () => {
    return (
        <>
            
                
                <Hero />
                <CardsSection />
                <Cta />
                 <TestimonialsSection />

            
        </>
    )
}

export default Home
