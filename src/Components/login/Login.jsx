import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../provider/authProvider';
import { useNavigate } from "react-router-dom";
import Header from '../header/Header'
import Footer from '../footer/Footer'
import './Login.css'

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState('')
    const navigate = useNavigate();
    const { setToken } = useAuth()
    // Função que estava dando certo a requisição mas não a verificação do token.
    const handleSubmit = async (event) => {
        event.preventDefault();
        setErro('')
        const data = {
            username: username,
            password: password
        };

        try {
            const response = await axios.post('http://44.201.214.145:8000/api/token/', data);

            if (response.status === 200) {
                const token = response.data.access;

                // Use a função setToken do contexto de autenticação para definir o token
                setToken(token);

                // Redirecionar para a página Home
                navigate("/Home");
            } 
        } catch (error) {
            
            console.error(error);
            setUsername('');
                setPassword('');
            setErro('O usuário ou a senha estão incorretos.')
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