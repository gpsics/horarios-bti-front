import React, { useState } from 'react'
import Header from '../../header/Header'
import Menu from '../../menuLateral/Menu'
import Footer from '../../footer/Footer'
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Dados = ({ compEdit, componente }) => {
    const [erro, setErro] = useState('')
    const [mensagem, setMensagem] = useState('')
    const navigate = useNavigate();
    const removerComponente = async (codigo) => {
        setErro('')
        setMensagem('')
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
                setMensagem('Componente Deletado com sucesso!');
                navigate('/Home')
            } else {
                setErro('Erro ao Deletar Componente.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    const editarComponente = (item) => {
        compEdit(item)
        navigate("/componentes/editarComponente");
    }
    return (
        <React.Fragment>
            <Header link={'/Home'} />
            <main id="entidades">
                <div id="menu"><Menu /></div>
                <article className="conteudo verComp">
                    <h1>Dados do Componente {componente.nome}</h1>
                    <section className="verDadosComp">
                        <ul>
                            <li>
                                <b>Nome: </b>
                                <span className="itens">{componente.nome}</span>
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
                            {mensagem && <div className="cadSucess">{mensagem}</div>}
                        </div>
                        <div className='botoes'>
                            <button id='editar' onClick={() => editarComponente({componente})}>
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
                </article>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default Dados
