import React, { useCallback, useEffect, useState } from 'react'
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
import axios from 'axios';
import Error from '../../alerts/Error';
import { useAuth } from '../../../provider/authProvider';

const ListarComponentes = () => {
    const {token} = useAuth()
    const [componentes, setComponentes] = useState([]);
    const [compsBusca, setCompsBusca] = useState([])
    const navigate = useNavigate();
      
    const removerComponente = async (codigo) => {
        Confirm.excluir().then(async (result) => {
            if (result.isConfirmed) {
                
                const url = `http://127.0.0.1:8000/api/componentes/${codigo}/`;
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                try {
                    const response = await axios.delete(url, config);
                    if (response.status === 200) {
                        Sucess.delete()
                        // Atualizar o estado removendo o componente da lista
                        setComponentes(prevComponentes => prevComponentes.filter(comp => comp.codigo !== codigo));
                        setCompsBusca(prevComponentes => prevComponentes.filter(comp => comp.codigo !== codigo));
                    } else {
                        Error.erro('Erro ao Deletar Componente.');
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                }

            }
        })
    };


    
    const fetchComponente = useCallback( async () => {
        const url = 'http://127.0.0.1:8000/api/componentes/';
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.get(url, config);
            if (response.status === 200) {
                const componentesData = response.data;
                setComponentes(componentesData);
                setCompsBusca(componentesData)
            } else {
                console.log('Erro ao listar componentes. Status code:', response.status);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    },[token]);

    useEffect(() => {
        fetchComponente();
    }, [fetchComponente]);
    
    const editarComponente = (item) => {
        navigate(`/componentes/editarComponente/${item.codigo} `);
    }
    const verComponente = (item) => {
        navigate(`/componentes/verDadosComponente/${item.codigo}`);
    }
    const buscarComponente = ({ target }) => {
        if (!target.value) {
            setCompsBusca(componentes);
        } else {
            // Filtragem de todos os componentes seja por nome ou código
            const filterCodigo = compsBusca.filter(({ codigo }) => codigo.toUpperCase().startsWith(target.value.toUpperCase()));
            const filterComps = compsBusca.filter(({ nome_comp }) => nome_comp.toUpperCase().startsWith(target.value.toUpperCase()));

            // Concatenar os dois arrays de filtros
            const concatenatedArray = filterComps.concat(filterCodigo);

            // Mapear para não ter repetição
            const map = new Map();
            concatenatedArray.forEach(item => {
                map.set(item.codigo, item);
            });
            const newArray = Array.from(map.values());

            // Enviar o newArray sem repetição
            setCompsBusca(newArray);
        }
    };

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
