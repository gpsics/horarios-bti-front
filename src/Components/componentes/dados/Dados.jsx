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
import AuthProvider from '../../../provider/authProvider';
import axios from 'axios';
import Error from '../../alerts/Error';

const Dados = () => {
    const { idComp } = useParams()
    const [componente, setComponente] = useState([]);
    const navigate = useNavigate();
    const auth = AuthProvider()

    const removerComponente = async (codigo) => {
        Confirm.excluir().then(async (result) => {
            if (result.isConfirmed) {
                const token = auth.token
                const url = `http://127.0.0.1:8000/api/componentes/${codigo}/`;
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                try {
                    const response = await axios.delete(url, config);
                    if (response.status === 204) {
                        Sucess.delete()
                        navigate('/componentes/listarComponentes')
                    } else {
                        Error.erro('Erro ao Deletar Componente.');
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                }

            }
        })
    };


    const fetchComponente = useCallback(async () => {
        const token = localStorage.getItem('token');
        const url = `http://127.0.0.1:8000/api/componentes/${idComp}`;
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
    }, [idComp]); 

    useEffect(() => {
        fetchComponente(); 
    }, [fetchComponente]);

    const editarComponente = (item) => {
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