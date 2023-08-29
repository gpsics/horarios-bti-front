import React, { useEffect, useState } from 'react'
import './ListarProfessores.css'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom'

const ListarProfessores = ({ profEdit }) => {
    const [erro, setErro] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [professors, setProfessors] = useState([]);
    const [profsBusca, setProfsBusca] = useState([])
    const navigate = useNavigate();

    const removerProfessor = async (id) => {
        setErro('')
        setMensagem('')
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
                setMensagem('Professor Deletado com sucesso!');
                // Atualizar o estado removendo o professor da lista
                setProfessors(prevProfessors => prevProfessors.filter(prof => prof.id !== id));
            } else {
                setErro('Erro ao Deletar professor.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    useEffect(() => {
        fetchProfessors();
    }, []);

    const fetchProfessors = async () => {
        setErro('')
        setMensagem('')
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
        profEdit(item)
        navigate("/professores/editarProfessor");
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
                <section id="listProf">
                    <h1 id='title'>Listar Professores</h1>
                    <div className="tableList">
                        {professors.length >= 0 ? (
                            <><table className="professor-table">
                                <thead id=''>
                                    <tr>
                                        <th>Nº</th>
                                        <th>Nome</th>
                                        <th id='horasSemanais'>Horas Semanais</th>
                                        <th></th>
                                        <th id='busca'><input type="text" placeholder='Buscar por Nome' onChange={buscarProfessor} /></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {profsBusca.map((item, index) => (
                                        <tr key={item.id}>
                                            <td className='index'>{index}</td>
                                            <td>{item.nome_prof}</td>
                                            <td id='horasSemanais'>{item.horas_semanais} Hrs</td>
                                            <td></td>
                                            <td className='funcoesIndex'>
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
                                    {mensagem && <div className="cadSucess">{mensagem}</div>}
                                </div>
                            </>
                        ) : (
                            <div id='nenhumCadastro'>
                                <p>Não tem nenhum professor cadastrado.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default ListarProfessores