import React, { useState } from 'react'
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
    const { token, checkTokenExpiration } = useAuth()


    const handleSubmit = async (event) => {
        event.preventDefault();
        checkTokenExpiration()
        Confirm.cadastrar().then(async (result) => {
            if (result.isConfirmed) {
                const regex = /[!@#$%^&*(),.?":{}|<>]/;
                const verificaCaracteres = regex.test(user)
                if (verificaCaracteres) {
                    Erro.erro('Não é permitido cadastrar caracteres especiais.')
                    return
                }
                const url = 'http://3.236.47.156:8000/api/professores/'
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
                        Sucess.cadastro()
                    }
                } catch (error) {
                    if (error.response) {
                        // Se houver dados na resposta, exiba a mensagem para o usuário
                        Erro.erro(Object.values(error.response.data).join('\n'));
                    } else {
                        console.error('Erro na requisição:', error.message);
                        Erro.erro('Erro desconhecido');
                    }
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