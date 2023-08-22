import React, { useState } from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import './CadastrarProfessor.css'
import CadastrarArquivo from './CadastrarArquivo'

const CadastrarProfessor = () => {
    const [user, setUser] = useState();
    const [erro, setErro] = useState('')
    const [mensagem, setMensagem] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErro('')
        setMensagem('')
        const token = localStorage.getItem('token');
        if (!token) {
            setErro('Você precisa estar logado para cadastrar um professor.');
            return;
        }
        const url = 'http://127.0.0.1:8000/professores/'
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify({ nome_prof: user }),
        };
        try {
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                setMensagem('Professor Cadastrado com sucesso!')
            } else {
                const data = await response.json()
                setErro('Erro ao cadastrar professor: ' + data.detail)
            }
        } catch (error) {
            console.error(error)
        }

    };


    return (
        <React.Fragment>
            <Header link={'/Home'} />
            <main id="entidades">
                <div id="menu"><Menu /></div>
                <section className="conteudo cadProf">
                    <h1>Cadastrar Professor</h1>
                    <section className="cadIndvidual">
                        <h3>Cadastrar Individualmente</h3>
                        <form onSubmit={handleSubmit} className='input-group'>
                            <input type="text" placeholder='Nome do Professor' value={user} onChange={e => setUser(e.target.value)} />
                            <button type='submit'>Cadastrar</button>
                        </form>
                        {erro && <div className="erroCad">{erro}</div>}
                        {mensagem && <div className="cadSucess">{mensagem}</div>}
                    </section>
                    <section className='cadArquivo'>
                        <CadastrarArquivo/>
                        <p>OBS: A organização do arquivo exige que cada linha contenha um nome de professor, sem a presença de vírgulas.</p>
                    </section>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default CadastrarProfessor