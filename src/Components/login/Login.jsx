import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../header/Header'
import Footer from '../footer/Footer'
import './Login.css'

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState('')
    const navigate = useNavigate();
    // Função que estava dando certo a requisição mas não a verificação do token.
    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://127.0.0.1:8000/api-token-auth/';

        // Dados de login
        const data = {
            username: username,
            password: password
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                const jsonResponse = await response.json();
                const token = jsonResponse.token;

                // Armazenar o token no localStorage
                localStorage.setItem('token', token);

                // Redirecionar para a página Home
                navigate("/Home");
            } else {
                setUsername('');
                setPassword('');
                setErro('O usuário ou a senha estão incorretos.');
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <React.Fragment>
            <Header link={'/'} />
            <main id="login">
                <div id="filtro">
                    <div id="formulario">
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit} >
                            <div className='inputLogin'>
                                <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="infoLogin" placeholder='Usuário' />

                            </div>
                            <div className='inputLogin'>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="infoLogin" placeholder='Senha' />

                            </div>

                            <input type="submit" value="ENTRAR" className="submit" />
                        </form>
                        {erro && <div className="erro">{erro}</div>}
                    </div>
                </div>
            </main>
            <Footer />
        </React.Fragment>
    );
};

export default Login;