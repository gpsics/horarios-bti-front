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
import './ListarTurmas.css'
const ListarTurmas = ({ turmaEdit, turVerDados }) => {
    const [erro, setErro] = useState('')
    const [turmas, setTurmas] = useState([]);

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
                        setTurmas(prevTurmas => prevTurmas.filter(turmaa => turmaa.id !== id));

                    } else {
                        setErro('Erro ao Deletar turma.');
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                }

            }
        })
    };

    useEffect(() => {
        fetchTurmas();
    }, []);

    const fetchTurmas = async () => {
        setErro('')
        const token = localStorage.getItem('token');
        const url = 'http://127.0.0.1:8000/turmas/';
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Token ${token}`,
            },
        };

        try {
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                const turmasData = await response.json();
                setTurmas(turmasData);
            } else {
                console.log('Erro ao listar turmas.')
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    const verTurma = (item) => {
        turVerDados(item)
        navigate("/turmas/verDadosTurma");
    }
    const editarTurma = (item) => {
        turmaEdit(item)
        navigate("/turmas/editarTurma");
    }

    return (
        <React.Fragment>
            <Header link={'/Home'} />
            <main id="entidades">
                <div className="menu"><Menu /></div>
                <section className="conteudo listarTurmas">
                    <h1>Listar Turmas</h1>
                    {turmas.length >= 0 ? (
                        <>
                            <table className='padraoTabelas'>
                                <thead>
                                    <tr>
                                        <th id='pontaEsquerda' className='primeiraColuna'>CÓDIGO</th>
                                        <th className='centralizarTexto'>TURMA</th>
                                        <th className='centralizarTexto'>HORÁRIOS</th>
                                        <td></td>
                                        <th></th>
                                        <th></th>
                                        <th id='pontaDireita'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <tr>
                                        <td className='primeiraColuna'>http://127.0.0.1:800/componentes/PEX1234/</td>
                                        <td className='centralizarTexto'>1</td>
                                        <td className='centralizarTexto'>23M45 3T23</td>
                                        <td></td>
                                        <td className='funcoesIndex'><GrView /></td>
                                        <td className='funcoesIndex'><MdModeEdit /></td>
                                        <td className='funcoesIndex'><AiFillDelete /></td>

                                    </tr> */}
                                    {turmas.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.cod_componente}</td>
                                            <td>{item.num_turma}</td>
                                            <td>{item.horario}</td>
                                            <td></td>
                                            <td className='funcoesIndex' id='view'>
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
                            <div>
                                {erro && <div className="erroCad">{erro}</div>}

                            </div>
                        </>
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
