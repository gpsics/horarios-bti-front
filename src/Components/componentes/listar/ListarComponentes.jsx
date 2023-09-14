import React, { useEffect, useState } from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { useNavigate } from 'react-router-dom'
import Confirm from '../../alerts/Confirm'
import Sucess from '../../alerts/Sucess'
import './ListarComponente.css'

const ListarComponentes = ({ compEdit, compVerDados }) => {
    const [erro, setErro] = useState('')
    const [componentes, setComponentes] = useState([]);
    const [compsBusca, setCompsBusca] = useState([])
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
                        // Atualizar o estado removendo o componente da lista
                        setComponentes(prevComponentes => prevComponentes.filter(comp => comp.codigo !== codigo));
                        setCompsBusca(prevComponentes => prevComponentes.filter(comp => comp.codigo !== codigo));
                    } else {
                        setErro('Erro ao Deletar Componente.');
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                }

            }
        })
    };

    useEffect(() => {
        fetchComponente();
    }, []);

    const fetchComponente = async () => {
        setErro('')
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
    const editarComponente = (item) => {
        compEdit(item)
        navigate("/componentes/editarComponente");
    }
    const verComponente = (item) => {
        compVerDados(item)
        navigate("/componentes/verDadosComponente");
    }
    const buscarComponente = ({ target }) => {
        if (!target.value) {
            setCompsBusca(componentes)
            return
        } else {
            const filterCodigo = compsBusca.filter(({ codigo }) => codigo.toUpperCase().startsWith(target.value.toUpperCase()))
            const filterComps = compsBusca.filter(({ nome_comp }) => nome_comp.toUpperCase().startsWith(target.value.toUpperCase()));

            setCompsBusca({ filterComps, filterCodigo })
        }
    }
    return (
        <React.Fragment>
            <Header link={'/Home'} />
            <main id='entidades'>
                <div className="menu"><Menu /></div>
                <section className='conteudo listarComponentes'>
                    <h1>Listar Componentes</h1>
                    {componentes.length > 0 ? (
                        <>
                            <section id='busca'>
                                <input type="text" placeholder='Buscar por Nome ou Código' onChange={buscarComponente} />
                            </section>
                            <table className='padraoTabelas'>
                                <thead>
                                    <tr>
                                        <th id='pontaEsquerda' className='primeiraColuna'>CÓDIGO</th>
                                        <th>COMPONENTE</th>
                                        <th className='espacoColuna'></th>
                                        <th ></th>
                                        <th></th>
                                        <th id='pontaDireita'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <tr>
                                        <td className='primeiraColuna'>PEX1234</td>
                                        <td>Arquitetura de Software</td>
                                        <td className='espacoColuna'></td>
                                        <td className='funcoesIndex'>
                                            <GrView />
                                        </td>
                                        <td className='funcoesIndex'>
                                            <MdModeEdit />
                                        </td>
                                        <td className='funcoesIndex'>
                                            <AiFillDelete />
                                        </td>
                                    </tr> */}

                                    {compsBusca.map((item) => (
                                        <tr key={item.codigo}>
                                            <td className='primeiraColuna'>{item.codigo}</td>
                                            <td>{item.nome_comp}</td>
                                            <td className='espacoColuna'></td>
                                            <td className='funcoesIndex'>
                                                <GrView onClick={() => verComponente(item)} />
                                            </td>
                                            <td className='funcoesIndex'>
                                                <MdModeEdit onClick={() => editarComponente(item)} />
                                            </td>
                                            <td className='funcoesIndex'>
                                                <AiFillDelete onClick={() => removerComponente(item.codigo)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div>
                                {erro && <div className="erroCad">{erro}</div>}

                            </div>
                        </>
                    ) : (
                        <div id='nenhumCOMP'>
                            <p>Não tem nenhum componente cadastrado.</p>
                        </div>
                    )}

                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default ListarComponentes
