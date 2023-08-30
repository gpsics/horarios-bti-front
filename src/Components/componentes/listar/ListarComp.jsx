import React, { useEffect, useState } from 'react'
import './ListarComp.css'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { useNavigate } from 'react-router-dom'

const ListarComponentes = ({compEdit, compVerDados}) => {
    const [erro, setErro] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [componentes, setComponentes] = useState([]);
    const [compsBusca, setCompsBusca] = useState([])
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
                // Atualizar o estado removendo o componente da lista
                setComponentes(prevComponentes => prevComponentes.filter(comp => comp.codigo !== codigo));
            } else {
                setErro('Erro ao Deletar Componente.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    useEffect(() => {
        fetchComponente();
    }, []);

    const fetchComponente = async () => {
        setErro('')
        setMensagem('')
        const token = localStorage.getItem('token');
        const url = 'http://127.0.0.1:8000/componentes/';
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
                setComponentes(componentesData);
                setCompsBusca(componentesData)
            } else {
                console.log('Erro ao listar componentes.')
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    const editarComponente = (item) =>{
        compEdit(item)
        navigate("/componentes/editarComponente");
    }
    const verComponente = (item) =>{
        compVerDados(item)
        navigate("/componentes/verDadosComponente");
    }
    const buscarComponente = ({ target }) => {
        if (!target.value) {
            setCompsBusca(componentes)
            return
        } else {
            const filterComps = compsBusca.filter(({ nome }) => nome.toUpperCase().startsWith(target.value.toUpperCase()));
            setCompsBusca(filterComps)
        }
    }
    return (
        <React.Fragment>
            <Header link={'/Home'} />
            <main id="entidades">
                <div id="menu"><Menu /></div>
                <section id="listComp">
                    <h1 id='title'>Listar Componentes</h1>
                    <div className="tableList">
                        {componentes.length > 0 ? (
                            <><table className="componente-table">
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Componente</th>
                                        <th id='busca'><input type="text" placeholder='Buscar por Nome' onChange={buscarComponente} /></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {compsBusca.map((item) => (
                                        <tr key={item.codigo}>
                                            <td>{item.codigo}</td>
                                            <td>{item.nome}</td>
                                            <td className='funcoesIndex' id='view'><GrView id='icon' onClick={() => verComponente(item)}/></td>
                                            <td className='funcoesIndex'><MdModeEdit onClick={() => editarComponente(item)}/></td>
                                            <td className='funcoesIndex'><AiFillDelete onClick={() => removerComponente(item.codigo)} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                                <div>
                                    {erro && <div className="erroCad">{erro}</div>}
                                    {mensagem && <div className="cadSucess">{mensagem}</div>}
                                </div>
                            </>
                        ) : (
                            <div id='nenhumCadastro'>
                                <p>Não tem nenhum componente cadastrado.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default ListarComponentes