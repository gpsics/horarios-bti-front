import React, { useCallback, useEffect, useState } from 'react'
import './ListarProfessores.css'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import Confirm from '../../alerts/Confirm'
import Sucess from '../../alerts/Sucess'
import { useAuth } from '../../../provider/authProvider'
import axios from 'axios'
import Erro from '../../alerts/Erro'

const ListarProfessores = () => {
    const [professors, setProfessors] = useState([]);
    const [profsBusca, setProfsBusca] = useState([])
    const navigate = useNavigate();
    const { token, checkTokenExpiration } = useAuth()
    

    const removerProfessor = async (id) => {
        checkTokenExpiration()
        Confirm.excluir().then(async (result) => {
            if (result.isConfirmed) {
                const url = `https://api-horarios-ufersa.tech/api/professores/${id}/`;
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                try {
                    const response = await axios.delete(url, config);
                    if (response.status === 204) {
                        Sucess.delete()
                        setProfessors(prevProfessors => prevProfessors.filter(prof => prof.id !== id));
                        setProfsBusca(prevProfessors => prevProfessors.filter(prof => prof.id !== id));
                    } else {
                        Erro.erro('Erro ao Deletar professor.');
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                }

            }
        })
    };


    const fetchProfessors = useCallback(async () => {

        const url = 'https://api-horarios-ufersa.tech/api/professores/';
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.get(url, config);
            if (response.status === 200) {
                const professorsData = response.data
                setProfessors(professorsData);
                setProfsBusca(professorsData)
            } else {
                console.log('Erro ao listar professores.')
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }, [token]);

    useEffect(() => {
        checkTokenExpiration()
        fetchProfessors();
    }, [fetchProfessors, checkTokenExpiration]);

    const editarProfessor = (item) => {
        checkTokenExpiration()
        navigate(`/professores/editarProfessor/${item.id}`);
    }
    const buscarProfessor = ({ target }) => {
        if (!target.value) {
            setProfsBusca(professors)
            return
        }
        const filterProfs = profsBusca.filter(({ nome_prof }) => nome_prof.toUpperCase().startsWith(target.value.toUpperCase()));
        setProfsBusca(filterProfs)

    }
    return (
        <React.Fragment>
            <Header titulo={'Listar Professores'} link={'/Home'} />
            <main id="entidades">
                <div id="menu"><Menu /></div>
                <section className='conteudo listarProfessores'>
                    {/* <h1>Listar Professores</h1> */}
                    {professors.length > 0 ? (
                        <>

                            <section id='busca'>
                                <input type="search" placeholder='Buscar por Nome' onChange={buscarProfessor} />
                            </section>
                            <table className='padraoTabelas tabelaProfs'>
                                <thead>
                                    <tr>
                                        <th id='pontaEsquerda' className='index primeiraColuna'>Nº</th>
                                        <th className='colNome'>NOME</th>
                                        <th id='horasSemanais'>HORAS SEMANAIS</th>
                                        <th></th>
                                        <th id='pontaDireita'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {profsBusca.map((item, index) => (
                                        <tr key={item.id}>
                                            <td className='index primeiraColuna'>{index + 1}</td>
                                            <td className='colNome'>{item.nome_prof}</td>
                                            <td id='horasSemanais'>{item.horas_semanais} Hrs</td>
                                            <td className='funcoesIndex' >
                                                <MdModeEdit onClick={() => editarProfessor(item)} />
                                            </td>
                                            <td className='funcoesIndex'>
                                                <AiFillDelete onClick={() => removerProfessor(item.id)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <div id='nenhumCOMP'>
                            <p>Não tem nenhum professor cadastrado.</p>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default ListarProfessores