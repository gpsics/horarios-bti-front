import React, { useCallback, useEffect, useState } from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import './EditarProfessor.css'
import Sucess from '../../alerts/Sucess'
import Confirm from '../../alerts/Confirm'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../provider/authProvider'
import Erro from '../../alerts/Erro'
import axios from 'axios'
import Cancelar from '../../alerts/Cancelar'

const EditarProfessor = () => {
    const { idProf } = useParams()
    const { token, checkTokenExpiration } = useAuth();

    const [newName, setNewName] = useState('')
    const navigate = useNavigate()
    const cancelarCadastro = () => {
        checkTokenExpiration()
        Cancelar.cancel().then(async (result) => {
            if (result.isConfirmed) {
                navigate(-1)
            }
        })
    }

    const updateProfessor = async (e) => {
        checkTokenExpiration()
        e.preventDefault()
        Confirm.editar().then(async (result) => {
            if (result.isConfirmed) {
                const url = `http://127.0.0.1:8000/api/professores/${idProf}/`;

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const data = {
                    nome_prof: newName
                }
                try {
                    const response = await axios.patch(url, data, config);
                    if (response.status === 201) {
                        Sucess.editado()
                        navigate(-1)
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

    const fetchProfessors = useCallback(async () => {
        const url = `http://127.0.0.1:8000/api/professores/${idProf}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.get(url, config);
            if (response.status === 200) {
                const professorsData = response.data
                setNewName(professorsData.nome_prof);
            } else {
                console.log('Erro ao listar professores.')
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }, [idProf, token]);

    useEffect(() => {
        checkTokenExpiration()
        fetchProfessors();
    }, [fetchProfessors, checkTokenExpiration]);

    return (
        <React.Fragment>
            <Header titulo={'Editar Professor'} link={'/Home'} />
            <main id="entidades">
                <div id="menu"><Menu /></div>
                <section className="conteudo edProf">
                    {/* <h1>Editar Professor</h1> */}
                    <section className="editarProf">
                        <div className="header-section">
                            <h2>Alterar Informações</h2>
                            <p>OBS: Não é permitido preencher com o nome de algum professor ja cadastrado e nem adicionar caracteres especiais.</p>
                        </div>
                        <form onSubmit={updateProfessor} className='input-group'>
                            <input type="text" placeholder='Nome do Professor' value={newName} onChange={e => setNewName(e.target.value)} />
                            <button onClick={cancelarCadastro} id='cancel' className="botoesCad" type='button'>Cancelar</button>
                            <button type="submit" className="botoesCad" id='cad'>Editar</button>
                        </form>

                    </section>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default EditarProfessor