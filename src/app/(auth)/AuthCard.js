const AuthCard = ({  children }) => (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        <div className="bg-white  py-8 px-8 ">
        <div className="text-3xl font-bold text-primary mb-8 text-center">Nutribert</div>

        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            {children}
        </div>
    </div>
    </div>
)

export default AuthCard
