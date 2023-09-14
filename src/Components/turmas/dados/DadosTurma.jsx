import React, { useState } from 'react'
import Header from '../../header/Header'
import Menu from '../../menuLateral/Menu'
import Footer from '../../footer/Footer'
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Sucess from '../../alerts/Sucess';
import Confirm from '../../alerts/Confirm';
import './DadosTurma.css'

const DadosTurma = ({ turmaEdit, turma }) => {
    const [erro, setErro] = useState('')
    const navigate = useNavigate();
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
        turmaEdit(item)
        navigate("/turmas/editarTurma");
    }
    return (
        <React.Fragment>
            <Header link={'/Home'} />
            <main id="entidades">
                <div id="menu"><Menu /></div>
                <article className="conteudo verTurma">
                    <h1>Dados de Turma </h1>
                    <section className="verDadosTurma">
                        <ul>
                            <li>
                                <b>Componente: </b>
                                <span className="itens">{turma.cod_componente.nome_comp}</span>
                            </li>
                            <li>
                                <b>Código: </b>
                                <span className="itens">{turma.cod_componente.codigo}</span>
                            </li>
                            <li>
                                <b>Carga Horária: </b>
                                <span className="itens">{turma.cod_componente.carga_horaria}Hrs</span>
                            </li>
                            <li>
                                <b>Unidade Responsável: </b>
                                <span className="itens">{turma.cod_componente.departamento}</span>
                            </li>
                            <li>
                                <b>Vagas: </b>
                                <span className="itens">{turma.num_vagas}</span>
                            </li>
                            {turma.professor.map((item) => (

                                <li key={turma.professor.id}>
                                    <b>Docente {turma.professor.id}: </b>
                                    <span className="itens">{turma.professor.nome_prof}</span>
                                </li>
                            ))}

                            <li>
                                <b>Horários: </b>
                                <span className="itens">{turma.horario}</span>
                            </li>
                            <li>
                                <b>Turma: </b>
                                <span className="itens">{turma.num_turma}</span>
                            </li>
                            <li>
                                <b>Semestre: </b>
                                <span className="itens">{turma.cod_componente.num_semestre}º Semestre</span>
                            </li>
                        </ul>
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
