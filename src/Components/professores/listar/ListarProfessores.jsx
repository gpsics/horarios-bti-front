import React, { useEffect, useState } from 'react'
import './ListarProfessores.css'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import Confirm from '../../alerts/Confirm'
import Sucess from '../../alerts/Sucess'

const ListarProfessores = () => {
    const [erro, setErro] = useState('')
    const [professors, setProfessors] = useState([]);
    const [profsBusca, setProfsBusca] = useState([])
    const navigate = useNavigate();

    const removerProfessor = async (id) => {
        Confirm.excluir().then(async (result) => {
            if (result.isConfirmed) {
                setErro('')
                const token = localStorage.getItem('token');
                const url = `http://127.0.0.1:8000/professores/${id}/`;
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
                        setProfessors(prevProfessors => prevProfessors.filter(prof => prof.id !== id));
                        setProfsBusca(prevProfessors => prevProfessors.filter(prof => prof.id !== id));
                    } else {
                        setErro('Erro ao Deletar professor.');
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                }

            }
        })
    };

    useEffect(() => {
        fetchProfessors();
    }, []);

    const fetchProfessors = async () => {
        setErro('')
        const token = localStorage.getItem('token');
        const url = 'http://127.0.0.1:8000/professores/';
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Token ${token}`,
            },
        };

        try {
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                const professorsData = await response.json();
                setProfessors(professorsData);
                setProfsBusca(professorsData)
            } else {
                console.log('Erro ao listar professores.')
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    const editarProfessor = (item) => {
        navigate(`/professores/editarProfessor/${item.id}`);
    }
    const buscarProfessor = ({ target }) => {
        if (!target.value) {
            setProfsBusca(professors)
            return
        } else {
            const filterProfs = profsBusca.filter(({ nome_prof }) => nome_prof.toUpperCase().startsWith(target.value.toUpperCase()));
            setProfsBusca(filterProfs)
        }
    }
    return (
        <React.Fragment>
            <Header link={'/Home'} />
            <main id="entidades">
                <div id="menu"><Menu /></div>
                <section className='conteudo listarProfessores'>
                    <h1>Listar Professores</h1>
                    {professors.length > 0 ? (
                        <>

                            <section id='busca'>
                                <input type="text" placeholder='Buscar por Nome' onChange={buscarProfessor} />
                            </section>
                            <table className='padraoTabelas'>
                                <thead>
                                    <tr>
                                        <th id='pontaEsquerda' className='index'>Nº</th>
                                        <th>NOME</th>
                                        <th id='horasSemanais'>HORAS SEMANAIS</th>
                                        <th></th>
                                        <th></th>
                                        <th id='pontaDireita'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <tr>
                                    <td className='index'>1</td>
                                    <td>LUAN ALVES DE PAIVA</td>
                                    <td id='horasSemanais'>16 Hrs</td>
                                    <td></td>
                                    <td className='funcoesIndex'>
                                        <MdModeEdit />
                                    </td>
                                    <td className='funcoesIndex'>
                                        <AiFillDelete />
                                    </td>
                                </tr> */}

                                    {profsBusca.map((item, index) => (
                                        <tr key={item.id}>
                                            <td className='index'>{index + 1}</td>
                                            <td>{item.nome_prof}</td>
                                            <td id='horasSemanais'>{item.horas_semanais} Hrs</td>
                                            <td></td>
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
                            <div>
                                {erro && <div className="erroCad">{erro}</div>}

                            </div>
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