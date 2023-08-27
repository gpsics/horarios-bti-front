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
                <section className="conteudo verComp">
                    <h1>Dados do Componente {componente.nome}</h1>
                    <section className="verDadosComp">
                        <ul>
                            <li><span className='itens'><b>Nome: </b></span>{componente.nome}</li>
                            <li><span className='itens'><b>Código: </b></span>{componente.codigo}</li>
                            <li><span className='itens'><b>Semestre: </b></span>{componente.num_semestre}</li>
                            <li><span className='itens'><b>Carga Horária: </b></span>{componente.carga_horaria}</li>
                            <li><span className='itens'><b>Unidade Responsável: </b></span>{componente.departamento}</li>
                            <li><span className='itens'><b>Este componente é: </b></span>{componente.obrigatorio ? 'Obrigatório' : 'Optativo'}</li>
                        </ul>
                    </section>
                    <section className='opcoes'>
                        <div>
                            {erro && <div className="erroCad">{erro}</div>}
                            {mensagem && <div className="cadSucess">{mensagem}</div>}
                        </div>
                        <button id='editar' onClick={() => editarComponente(componente)}>Editar<MdModeEdit /></button>
                        <button id='excluir' onClick={() => removerComponente(componente.codigo)}>Excluir<AiFillDelete /></button>
                    </section>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default Dados
