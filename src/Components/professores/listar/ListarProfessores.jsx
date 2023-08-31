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

const ListarProfessores = ({ profEdit }) => {
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
                        {professors.length > 0 ? (
                            <>
                                <section id='busca'>
                                    <input type="text" placeholder='Buscar por Nome' onChange={buscarProfessor} /></section>
                                <table className="professor-table">
                                    <thead >
                                        <tr>
                                            <td className='th'>Nº</td>
                                            <td className='th'>Nome</td>
                                            <td className='th' id='horasSemanais'>Horas Semanais</td>
                                            <td className='th' ></td>
                                            <td className='th'></td>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
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
                            <div id='nenhumPROF'>
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