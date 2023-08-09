import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../header/Header'
import Footer from '../footer/Footer'
import './Login.css'

const Login = () => {
    localStorage.clear();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try{
            let url = 'http://127.0.0.1:8000/api-token-auth/'
            // Simple POST request with a JSON body using fetch
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username, password: password })
            };
            fetch(url, requestOptions)
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('token', data.token)
                    setUsername({token: data.token})
                    setPassword({token: data.token})
                    // window.location.href = '/home';
                    navigate("/Home");
                    console.log(localStorage.getItem)
            });
            event.preventDefault()
        }catch (error) {
            setErro('O usuário ou a senha estão incorretos.')
            console.error(error);
        }
    }

    return (
        <React.Fragment>
            <Header link={'/'}/>
            <main id="login">
                <div id="filtro">
                    <div id="formulario">
                        <h2>Login</h2>
                        <form  onSubmit={handleSubmit}>
                            <label>
                                <input type="text" value={username} onChange={e => setUsername(e.target.value)}  placeholder="User" className="infoLogin"/>
                            </label>
                            <label>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="infoLogin"/>
                            </label>
                            <label className="conectado">
                                <input type="checkbox" /><p>Deixar-me conectado.</p>
                            </label>
                            <input type="submit" value="ENTRAR"  className="submit"/>
                        </form>
                        {erro && <div className="erro">{erro}</div>}
                    </div>
                </div>
            </main>
            <Footer/>
        </React.Fragment>
    );
};

export default Login;