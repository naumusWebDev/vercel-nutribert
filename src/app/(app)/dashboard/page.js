import Header from '@/app/(app)/Header'

export const metadata = {
    title: 'Nutribert - Bienvenido/a',
}

const Dashboard = () => {
    return (
        <>
            <Header title="Bienvenido/a" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-secondary">
                        <h3 className='text-xl text-primary'>¡Bienvenido a Nutribert!</h3>

<p>Estás a un paso más cerca de mejorar tu salud y bienestar.</p>
<p>No esperes más para empezar tu camino hacia una vida más saludable. ¿Por qué no pides una cita ahora mismo? Nuestros expertos en nutrición están aquí para guiarte y ayudarte a alcanzar tus metas de salud y bienestar mediante consejos personalizados sobre alimentación saludable.</p>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard