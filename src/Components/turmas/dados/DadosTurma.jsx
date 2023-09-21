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

// { turmaEdit }
const DadosTurma = () => {
    const { idTurma } = useParams()
    const [turma, setTurma] = useState(null);
    // const [codComp, setCodComp] = useState('')
    // const [nomeComp, setNomeComp] = useState('')
    // const [numSemestre, setNumSemestre] = useState('')
    // const [cargaHoraria, setCargaHoraria] = useState('')
    // const [departamento, setDepartamento] = useState()
    const [erro, setErro] = useState('')
    const navigate = useNavigate();


    const fetchTurmas = useCallback(async () => {
        setErro('')
        const token = localStorage.getItem('token');
        const url = `http://127.0.0.1:8000/turmas/${idTurma}`;
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Token ${token}`,
            },
        };

        try {
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                const turmasData = await response.json();

                setTurma(turmasData);
            } else {
                console.log('Erro ao listar turmas.')
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }, [idTurma]);
    useEffect(() => {
        fetchTurmas();
    }, [fetchTurmas]);

    const removerTurma = async (id) => {
        Confirm.excluir().then(async (result) => {
            if (result.isConfirmed) {
                setErro('')
                const token = localStorage.getItem('token');
                const url = `http://127.0.0.1:8000/turmas/${id}/`;
                const requestOptions = {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                };

                try {
                    const response = await fetch(url, requestOptions);
                    if (response.ok) {
                        Sucess.delete()
                        navigate('/turmas/listarTurmas')
                    } else {
                        setErro('Erro ao Deletar Turma.');
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                }

            }
        })
    };

    const editarTurma = (item) => {
        // turmaEdit(item)
        navigate(`/turmas/editarTurma/${item.id}`);
    }
    return (
        <React.Fragment>
            <Header link={'/Home'} />
            <main id="entidades">
                <div id="menu"><Menu /></div>
                <article className="conteudo verTurma">
                    <h1>Dados de Turma </h1>
                    <section className="verDadosTurma">
                        {/* <li>
                            <b>Componente: </b>
                            <span className="itens">Engenharia de Software</span>
                        </li>
                        <li>
                            <b>Código: </b>
                            <span className="itens">PEX1234</span>
                        </li>
                        <li>
                            <b>Carga Horária: </b>
                            <span className="itens">12 Hrs</span>
                        </li>
                        <li>
                            <b>Unidade Responsável: </b>
                            <span className="itens">DETEC</span>
                        </li>
                        <li>
                            <b>Vagas: </b>
                            <span className="itens">12 </span>
                        </li>
                        <li >
                            <b>Docente : </b>
                            <span className="itens">LUAN ALVES DE PAIVA</span>
                        </li>

                        <li>
                            <b>Horários: </b>
                            <span className="itens">23M45 23T45</span>
                        </li>
                        <li>
                            <b>Turma: </b>
                            <span className="itens">01</span>
                        </li>
                        <li>
                            <b>Semestre: </b>
                            <span className="itens">1º Semestre</span>
                        </li> */}
                        {turma && (

                            <ul>
                                <li>
                                    <b>Componente: </b>
                                    <span className="itens">{turma.cod_componente?.nome_comp || 'Nome não disponível'}</span>
                                </li>
                                <li>
                                    <b>Código: </b>
                                    <span className="itens">{turma.cod_componente?.codigo || 'Código não disponível'}</span>
                                </li>
                                <li>
                                    <b>Carga Horária: </b>
                                    <span className="itens">{turma.cod_componente?.carga_horaria || 'Carga horária não disponível'} Hrs</span>
                                </li>
                                <li>
                                    <b>Unidade Responsável: </b>
                                    <span className="itens">{turma.cod_componente?.departamento || 'Unidade responsável não disponível'}</span>
                                </li>
                                <li>
                                    <b>Vagas: </b>
                                    <span className="itens">{turma.num_vagas || 'Vagas não disponíveis'}</span>
                                </li>
                                <li>
                                    <b>Docente(s):</b>
                                    {turma.professor && turma.professor.length > 0 ? (
                                        <ul>
                                            {turma.professor.map((prof) => (
                                                <li key={prof.id}>
                                                    <span className="itens">{prof.nome_prof}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span className="itens">Nenhum docente atribuído</span>
                                    )}
                                </li>
                                <li>
                                    <b>Horários: </b>
                                    <span className="itens">{turma.horario || 'Horários não disponíveis'}</span>
                                </li>
                                <li>
                                    <b>Turma: </b>
                                    <span className="itens">{turma.num_turma || 'Turma não disponível'}</span>
                                </li>
                            </ul>

                        )}
                    </section>
                    <section className='opcoes'>
                        <div>
                            {erro && <div className="erroCad">{erro}</div>}

                        </div>
                        <div className='botoes'>
                            <button id='editar' onClick={() => editarTurma(turma)}>
                                <p>Editar</p>
                                <i>
                                    <MdModeEdit />
                                </i>
                            </button>
                            <button id='excluir' onClick={() => removerTurma(turma.id)}>
                                <p>Excluir</p>
                                <i>
                                    <AiFillDelete />
                                </i>
                            </button>
                        </div>
                    </section>
                </article>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default DadosTurma