import React, { useState } from 'react';

    const Login = () => {
      const [cpf, setCpf] = useState('');
      const [isChecked, setIsChecked] = useState(false);

      const handleCpfChange = (e) => {
        setCpf(e.target.value);
      };

      const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
      };

      const handleLogin = () => {
        console.log('CPF:', cpf);
        console.log('Checkbox está', isChecked ? 'selecionado' : 'desselecionado');
      };

  return (
      <form className="flex flex-col items-start">
          <h1 className="font-primary text-white text-[20px] p-4 mb-0 -ml-4">Digite seu CPF</h1>
          <input
          type="text"
          className="w-full h-10 bg-opacity-100 -mb-2 bg-input border-2 border-greenBorder p-4 rounded-md outline-none font-primary text-sm text-white"
          id="cpf"
          value={cpf}
          onChange={handleCpfChange}
          placeholder="Digite seu CPF"
          />
          <label>
            <input
              type="checkbox"
              className="text-white text-[10px] p-4 mb-0 -ml-4"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            Manter-me Conectado
          </label>

          <button type="submit" onClick={handleLogin} className="h-10 bg-greenBg w-full mt-5 border-greenBorder p-2 rounded-md outline-none font-primary text-sm text-white">Logar</button>
      </form>
  )

}

export default Login;