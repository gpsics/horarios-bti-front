import React, { useCallback, useEffect, useState } from 'react'
import Header from '../../header/Header'
import Menu from '../../menuLateral/Menu'
import Footer from '../../footer/Footer'
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import Sucess from '../../alerts/Sucess';
import Confirm from '../../alerts/Confirm';
import './DadosTurma.css'
import { useAuth } from '../../../provider/authProvider';
import axios from 'axios';
import Erro from '../../alerts/Erro';

const DadosTurma = () => {
    const { idTurma } = useParams()
    const { token, checkTokenExpiration } = useAuth();
    const [turma, setTurma] = useState(null);
    const [componente, setComponente] = useState([]);
    const [docentesArray, setDocentesArray] = useState([])
    const navigate = useNavigate();

    const fetchDocente = useCallback(async (ids) => {
        try {
            const promises = ids.map(async (id) => {
                const url = `http://44.201.214.145:8000/api/professores/${id}/`;
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get(url, config);
                if (response.status === 200) {
                    return response.data;
                } else {
                    console.error(`Erro fetching professor ${id}:`, response);
                }
            });

            return Promise.all(promises);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }, [token])
    const fetchTurmas = useCallback(async () => {
        const fetchComponente = async (idComp) => {
            const url = `http://44.201.214.145:8000/api/componentes/${idComp}`;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            try {
                const response = await axios.get(url, config);
                if (response.status === 200) {
                    const componentesData = response.data
                    setComponente(componentesData);
                } else {
                    console.log('Erro ao listar componentes.');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }
        const url = `http://44.201.214.145:8000/api/turmas/${idTurma}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = await axios.get(url, config);
            if (response.status === 200) {
                const turmasData = response.data;
                fetchComponente(turmasData.cod_componente);
                const docentesData = await fetchDocente(turmasData.professor);
                setDocentesArray(docentesData);
                setTurma(turmasData);
            } else {
                console.log('Erro ao listar turmas.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }, [idTurma, token, fetchDocente]);

    useEffect(() => {
        checkTokenExpiration()
        fetchTurmas();
    }, [fetchTurmas, checkTokenExpiration]);
    const removerTurma = async (id) => {
        checkTokenExpiration()
        Confirm.excluir().then(async (result) => {
            if (result.isConfirmed) {
                const url = `http://44.201.214.145:8000/api/turmas/${id}/`;
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                try {
                    const response = await axios.delete(url, config);
                    if (response.status === 204) {
                        Sucess.delete()
                        navigate('/turmas/listarTurmas')
                    } else {
                        Erro.erro('Erro ao Deletar Turma.');
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                }

            }
        })
    };

    const editarTurma = (item) => {
        checkTokenExpiration()
        navigate(`/turmas/editarTurma/${item.id}`);
    }
    return (
        <React.Fragment>
            <Header titulo={'Dados de Turma'} link={'/Home'} />
            <main id="entidades">
                <div id="menu"><Menu /></div>
                <section className="conteudo verTurma">
                    <section className="verDadosTurma">
                        {turma && (
                            <ul>
                                <li>
                                    <b>Componente: </b>
                                    <span className="itens">{componente.nome_comp || 'Nome não disponível'}</span>
                                </li>
                                <li>
                                    <b>Código: </b>
                                    <span className="itens">{turma.cod_componente || 'Código não disponível'}</span>
                                </li>
                                <li>
                                    <b>Carga Horária: </b>
                                    <span className="itens">{componente.carga_horaria || 'Carga horária não disponível'} Hrs</span>
                                </li>
                                <li>
                                    <b>Unidade Responsável: </b>
                                    <span className="itens">{componente.departamento || 'Unidade responsável não disponível'}</span>
                                </li>
                                <li>
                                    <b>Vagas: </b>
                                    <span className="itens">{turma.num_vagas || 'Vagas não disponíveis'}</span>
                                </li>
                                <li>
                                    <b>Horários: </b>
                                    <span className="itens">{turma.horario || 'Horários não disponíveis'}</span>
                                </li>
                                <li>
                                    <b>Turma: </b>
                                    <span className="itens">{turma.num_turma || 'Turma não disponível'}</span>
                                </li>
                                <li className='docentesDaTurma'>
                                    <b>Docente(s):</b>
                                    {docentesArray.length > 0 ? (
                                        <ul>
                                            {docentesArray.map((prof) => (
                                                <li key={prof.id}>
                                                    <span className="itens">{prof.nome_prof}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span className="itens">Nenhum docente atribuído</span>
                                    )}

                                </li>
                            </ul>

                        )}
                    </section>
                    <section className='opcoesButtons opcoesDadosTur'>
                        <button id='cad' className='botoesCad' onClick={() => editarTurma(turma)}>
                            <p>Editar</p>
                            <i>
                                <MdModeEdit />
                            </i>
                        </button>
                        <button id='deletar' className='botoesCad' onClick={() => removerTurma(turma.id)}>
                            <p>Excluir</p>
                            <i>
                                <AiFillDelete />
                            </i>
                        </button>

                    </section>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default DadosTurma