import React, { useEffect, useState } from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import './CadastrarProfessor.css'
import CadastrarArquivo from './CadastrarArquivo'
import Sucess from '../../alerts/Sucess'
import Confirm from '../../alerts/Confirm'
import Error from '../../alerts/Error'

const CadastrarProfessor = () => {
    const [user, setUser] = useState();
    const [professors, setProfessors] = useState([]);
    useEffect(() => {
        fetchProfessors();
    }, []);

    const fetchProfessors = async () => {
        const token = localStorage.getItem('token');
        const url = 'http://127.0.0.1:8000/professores/';
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Token ${token}`,
            },
        };

        try {
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                const professorsData = await response.json();
                setProfessors(professorsData);
            } else {
                console.log('Erro ao listar professores.')
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        Confirm.cadastrar().then(async (result) => {
            if (result.isConfirmed) {
                const existeDocente = professors.some(({ nome_prof }) => nome_prof === user);
                if (existeDocente) {
                    Error.erro('Professor já cadastrado!')
                    
                    return;
                }

                const token = localStorage.getItem('token');
                if (!token) {
                    Error.erro('Você precisa estar logado para cadastrar um professor.');
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
                        fetchProfessors()
                        Sucess.cadastro()
                    } else {
                        Error.erro('Erro ao cadastrar professor!')
                    }
                } catch (error) {
                    console.error(error)
                }

            }
        })

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
                            <button type='submit' className='botaoCadastrar'>Cadastrar</button>
                        </form>


                    </section>
                    <section className='cadArquivo'>
                        <CadastrarArquivo />
                        <p>OBS: A organização do arquivo exige que cada linha contenha um nome de professor, sem a presença de vírgulas.</p>
                    </section>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default CadastrarProfessor