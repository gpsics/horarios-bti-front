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
import './ListarTurmas.css'
import Erro from '../../alerts/Erro';
import { useAuth } from '../../../provider/authProvider';
import axios from 'axios';


const ListarTurmas = () => {
    const [turmas, setTurmas] = useState([]);
    const [componentes, setComponentes] = useState([])
    const { token, checkTokenExpiration } = useAuth();
    const navigate = useNavigate();
    const removerTurma = async (id) => {
        checkTokenExpiration()
        Confirm.excluir().then(async (result) => {
            if (result.isConfirmed) {
                const url = `https://api-horarios-ufersa.tech/api/turmas/${id}/`;
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                try {
                    const response = await axios.delete(url, config);
                    if (response.status === 204) {
                        Sucess.delete()
                        setTurmas(prevTurmas => prevTurmas.filter(turmaa => turmaa.id !== id));

                    } else {
                        Erro.erro('Erro ao Deletar turma.')
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                }

            }
        })
    };

    const fetchComponentes = useCallback(async () => {
        for (const turma of turmas) {
            const url = `https://api-horarios-ufersa.tech/api/componentes/${turma.cod_componente}`
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            try {
                const response = await axios.get(url, config);
                if (response.status === 200) {
                    const compsData = response.data
                    setComponentes(prevComponentes => [...prevComponentes, compsData]);
                } else {
                    console.log('Erro ao listar turmas.')
                }
            } catch (error) {
                console.error(error)
            }
        }
    }, [turmas, token]);
    
    const fetchTurmas = useCallback(async () => {
        const url = 'https://api-horarios-ufersa.tech/api/turmas/';
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    
        try {
            const response = await axios.get(url, config);
            if (response.status === 200) {
                const turmasData = response.data;
                if (turmasData.length > 0) {
                    setTurmas(turmasData);
                    fetchComponentes(); // Chama fetchComponentes apenas se turmasData não estiver vazio
                } else {
                    console.log('Nenhuma turma encontrada.');
                }
            }
        } catch (error) {
            console.error('Ocorreu um erro:', error);
        }
    }, [token, fetchComponentes]);
    

    useEffect(() => {
        checkTokenExpiration()
        fetchTurmas();
    }, [fetchTurmas, checkTokenExpiration]);
    const verTurma = (item) => {
        checkTokenExpiration()
        navigate(`/turmas/verDadosTurma/${item.id}`);
    }

    const editarTurma = (item) => {
        checkTokenExpiration()
        navigate(`/turmas/editarTurma/${item.id}`);
    }
    return (
        <React.Fragment>
            <Header titulo={'Listar Turmas'} link={'/Home'} />
            <main id="entidades">
                <div id="menu"><Menu /></div>
                <section className="conteudo listarTurmas">
                    {turmas.length > 0 ? (
                        <table className='padraoTabelas tabelaTurmas'>
                            <thead>
                                <tr>
                                    <th id='pontaEsquerda' className='primeiraColuna'>CÓDIGO</th>
                                    <th className='nomeComponente'>COMPONENTE</th>
                                    <th className='centralizarTexto numerTurma'>TURMA</th>
                                    <th className='centralizarTexto horarioss'>HORÁRIOS</th>
                                    <th></th>
                                    <th></th>
                                    <th id='pontaDireita'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {turmas.map((item, index) => (
                                    <tr key={index}>
                                        <td className='primeiraColuna'>{item.cod_componente}</td>
                                        <td className='nomeComponente'>{componentes.find(comp => comp.codigo === item.cod_componente)?.nome_comp || ''} </td>
                                        <td className='centralizarTexto numerTurma'>{item.num_turma}</td>
                                        <td className='centralizarTexto horarioss'>{item.horario}</td>
                                        <td className='funcoesIndex'>
                                            <GrView onClick={() => verTurma(item)} />
                                        </td>
                                        <td className='funcoesIndex'>
                                            <MdModeEdit onClick={() => editarTurma(item)} />
                                        </td>
                                        <td className='funcoesIndex'>
                                            <AiFillDelete onClick={() => removerTurma(item.id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    ) : (
                        <div id='nenhumaTurma'>
                            <p>Não tem nenhuma turma cadastrada.</p>
                        </div>
                    )}

                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default ListarTurmas
