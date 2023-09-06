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
                    const isAuth= localStorage.getItem('token');
                    if(isAuth){
                        navigate("/Home");
                    }else{
                        setUsername('')
                        setPassword('')
                        setErro('O usuário ou a senha estão incorretos.')
                    }
            });
            event.preventDefault()
        }catch (error) {            
            console.error(error);
        }
    }
    // const handleSubmit = async (event) => {
    //     try {
    //         let url = 'http://127.0.0.1:8000/api-token-auth/';
    //         const requestOptions = {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ username: username, password: password })
    //         };
    //         const response = await fetch(url, requestOptions);
    //         const data = await response.json();

    //         if (response.ok) {
    //             localStorage.setItem('token', data.token);
    //             navigate("/Home");
    //         } else {
    //             setUsername('');
    //             setPassword('');
    //             setErro('O usuário ou a senha estão incorretos.');
    //             localStorage.removeItem('token'); 
    //         }

    //         event.preventDefault();
    //     } catch (error) {            
    //         console.error(error);
    //     }
    // }
    return (
        <React.Fragment>
            <Header link={'/'}/>
            <main id="login">
                <div id="filtro">
                    <div id="formulario">
                        <h2>Login</h2>
                        <form  onSubmit={handleSubmit} >
                            <div className='inputLogin'>
                                <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="infoLogin" placeholder='Usuário'/>
                                
                            </div>
                            <div className='inputLogin'>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="infoLogin" placeholder='Senha'/>
                                
                            </div>
                            
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