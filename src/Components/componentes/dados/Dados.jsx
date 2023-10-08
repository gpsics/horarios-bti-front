import React, { useCallback, useEffect, useState } from 'react'
import Header from '../../header/Header'
import Menu from '../../menuLateral/Menu'
import Footer from '../../footer/Footer'
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import './Dados.css'
import Sucess from '../../alerts/Sucess';
import Confirm from '../../alerts/Confirm';

// { compEdit, componente }
const Dados = () => {
    const { idComp } = useParams()
    const [componente, setComponente] = useState([]);
    const [erro, setErro] = useState('')
    const navigate = useNavigate();
    const removerComponente = async (codigo) => {
        Confirm.excluir().then(async (result) => {
            if (result.isConfirmed) {
                setErro('')
                const token = localStorage.getItem('token');
                const url = `http://127.0.0.1:8000/componentes/${codigo}/`;
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
                        navigate('/componentes/listarComponentes')
                    } else {
                        setErro('Erro ao Deletar Componente.');
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                }

            }
        })
    };


    const fetchComponente = useCallback(async () => {
        setErro('');
        const token = localStorage.getItem('token');
        const url = `http://127.0.0.1:8000/componentes/${idComp}`;
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Token ${token}`,
            },
        };

        try {
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                const componentesData = await response.json();
                setComponente(componentesData);
            } else {
                console.log('Erro ao listar componentes.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }, [idComp]); // Adicione idComp como dependência

    useEffect(() => {
        fetchComponente(); // Chama a função fetchComponente dentro do useEffect
    }, [fetchComponente]);

    const editarComponente = (item) => {
        // compEdit(item)
        navigate(`/componentes/editarComponente/${item.codigo}`);
    }

    return (
        <React.Fragment>
            <Header link={'/Home'} />
            <main id="entidades">
                <div id="menu"><Menu /></div>
                <section className="conteudo verComp">
                    <h1>Dados do Componente </h1>
                    <section className="verDadosComp">
                        <ul>
                            <li>
                                <b>Nome: </b>
                                <span className="itens">{componente.nome_comp}</span>
                            </li>
                            <li>
                                <b>Código: </b>
                                <span className="itens">{componente.codigo}</span>
                            </li>
                            <li>
                                <b>Semestre: </b>
                                <span className="itens">{componente.num_semestre}º Semestre</span>
                            </li>
                            <li>
                                <b>Carga Horária: </b>
                                <span className="itens">{componente.carga_horaria}Hrs</span>
                            </li>
                            <li>
                                <b>Unidade Responsável: </b>
                                <span className="itens">{componente.departamento}</span>
                            </li>
                            <li>
                                <b>Este componente é: </b>
                                <span className="itens">{componente.obrigatorio ? 'Obrigatório' : 'Optativo'}</span>
                            </li>
                        </ul>
                    </section>
                    <section className='opcoes'>
                        <div>
                            {erro && <div className="erroCad">{erro}</div>}

                        </div>
                        <div className='botoes'>
                            <button id='editar' onClick={() => editarComponente(componente)}>
                                <p>Editar</p>
                                <i>
                                    <MdModeEdit />
                                </i>
                            </button>
                            <button id='excluir' onClick={() => removerComponente(componente.codigo)}>
                                <p>Excluir</p>
                                <i>
                                    <AiFillDelete />
                                </i>
                            </button>
                        </div>
                    </section>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default Dados