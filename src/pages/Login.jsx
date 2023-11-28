function Login () {

    return (
        <form className="flex flex-col items-start">
            <h1 className="font-primary text-white text-[20px] p-4 mb-0 -ml-4">Digite seu CPF</h1>
            <input
            type="text"
            className="w-full h-10 bg-opacity-100 -mb-2 bg-input border-2 border-greenBorder p-4 rounded-md outline-none font-primary text-sm text-white"
            placeholder="Digite aqui"
            />
            <div className="flex items-center mt-4">
                <input
                type="checkbox"
                id="keepLoggedIn"
                className="mr-2"
                />
                <label htmlFor="keepLoggedIn" className="text-white text-[10px]">
                Manter-me conectado
                </label>
            </div>
            <button type="submit" className="h-10 bg-greenBg w-full mt-5 border-greenBorder p-2 rounded-md outline-none font-primary text-sm text-white">Logar</button>
        </form>
    )

}

export default Login;