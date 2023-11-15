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
import Error from '../../alerts/Error';
import { useAuth } from '../../../provider/authProvider';
import axios from 'axios';


const ListarTurmas = () => {
    const [turmas, setTurmas] = useState([]);
    const { token } = useAuth()
    const navigate = useNavigate();
    const removerTurma = async (id) => {
        Confirm.excluir().then(async (result) => {
            if (result.isConfirmed) {
                const url = `http://127.0.0.1:8000/api/turmas/${id}/`;
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
                        Error.erro('Erro ao Deletar turma.')
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                }

            }
        })
    };


    const fetchTurmas = useCallback(async () => {
        const url = 'http://127.0.0.1:8000/api/turmas/';
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.get(url, config);
            if (response.status === 200) {
                const turmasData = response.data
                setTurmas(turmasData);
                
            } else {
                console.log('Erro ao listar turmas.')
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }, [token])

    useEffect(() => {
        fetchTurmas();
    }, [fetchTurmas]);
    const verTurma = (item) => {
        // turVerDados(item)
        navigate(`/turmas/verDadosTurma/${item.id}`);
    }
    const editarTurma = (item) => {
        // turmaEdit(item)
        navigate("/turmas/editarTurma");
    }

    return (
        <React.Fragment>
            <Header link={'/Home'} />
            <main id="entidades">
                <div className="menu"><Menu /></div>
                <section className="conteudo listarTurmas">
                    <h1>Listar Turmas</h1>
                    {turmas.length > 0 ? (
                        <table className='padraoTabelas'>
                            <thead>
                                <tr>
                                    <th id='pontaEsquerda' className='primeiraColuna'>CÓDIGO</th>
                                    <th className='nomeComponente'>COMPONENTE</th>
                                    <th className='centralizarTexto'>TURMA</th>
                                    <th className='centralizarTexto'>HORÁRIOS</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th id='pontaDireita'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {turmas.map((item, index) => (
                                    <tr key={index}>
                                        <td className='primeiraColuna'>{item.cod_componente}</td>
                                        <td className='nomeComponente'>{item.cod_componente.nome_comp} </td>
                                        <td className='centralizarTexto'>{item.num_turma}</td>
                                        <td className='centralizarTexto'>{item.horario}</td>
                                        <td></td>
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
                        <div id='nenhumCOMP'>
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
