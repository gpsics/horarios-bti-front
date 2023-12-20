import React, { useCallback, useEffect, useState } from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import './CadastrarProfessor.css'
import CadastrarArquivo from './CadastrarArquivo'
import Sucess from '../../alerts/Sucess'
import Confirm from '../../alerts/Confirm'
import Erro from '../../alerts/Erro'
import { useAuth } from '../../../provider/authProvider'
import axios from 'axios'

const CadastrarProfessor = () => {
    const [user, setUser] = useState('');
    const [professors, setProfessors] = useState([]);
    const { token } = useAuth()

    const fetchProfessors = useCallback(async () => {
        const url = 'http://127.0.0.1:8000/api/professores/';
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.get(url, config);
            if (response.status === 200) {
                const professorsData = response.data;
                setProfessors(professorsData);
            } else {
                console.log('Erro ao listar professores.')
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }, [token]);

    useEffect(() => {
        fetchProfessors();
    }, [fetchProfessors]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        Confirm.cadastrar().then(async (result) => {
            if (result.isConfirmed) {
                if (user === '') {
                    Erro.erro('Informe o nome do professor!')
                }
                const existeDocente = professors.some(({ nome_prof }) => nome_prof === user);
                if (existeDocente) {
                    Erro.erro('Professor já cadastrado!')
                    return;
                }
                const regex = /[!@#$%^&*(),.?":{}|<>]/;
                const verificaCaracteres = regex.test(user)
                if(verificaCaracteres){
                    Erro.erro('Não é permitido cadastrar caracteres especiais.')
                    return
                }
                const url = 'http://127.0.0.1:8000/api/professores/'
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const data = {
                    nome_prof: user
                }
                try {
                    const response = await axios.post(url, data, config);
                    if (response.status === 201) {
                        setUser('')
                        fetchProfessors()
                        Sucess.cadastro()
                    } else {
                        Erro.erro('Erro ao cadastrar professor!')
                    }
                } catch (error) {
                    console.error(error)
                }

            }
        })

    };


    return (
        <React.Fragment>
            <Header titulo={'Cadastrar Professor'} link={'/Home'} />
            <main id="entidades">
                <div id="menu"><Menu /></div>
                <section className="conteudo cadProf">
                    {/* <h1>Cadastrar Professor</h1> */}
                    <section className="cadIndvidual">
                        <div className="header-section">
                            <h2>Cadastrar Individualmente</h2>
                            <p>Informe o nome do professor que você deseja cadastrar.</p>
                            <p>OBS: Não é permitido cadastrar o mesmo professor duas vezes e nem adicionar caracteres especiais.</p>
                        </div>
                        <form onSubmit={handleSubmit} className='input-group'>
                            <input type="text" placeholder='Nome do Professor' value={user} onChange={e => setUser(e.target.value)} />
                            <button type='submit' className='botoesCad' id='cad'>Cadastrar</button>
                        </form>
                    </section>
                    <section className='cadArquivo'>
                        <CadastrarArquivo />
                    </section>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default CadastrarProfessor