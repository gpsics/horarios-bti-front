import React, { useEffect, useState } from 'react'
import './ListarProfessores.css'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
const ListarProfessores = () => {
    const [professorList, setProfessorList] = useState([]);
    const [erro, setErro] = useState('')
    const [mensagem, setMensagem] = useState('')

    const removerProfessor = async (index) => {
        setErro('')
        setMensagem('')
        const token = localStorage.getItem('token');
        const url = `http://127.0.0.1:8000/professores/${index}/`;
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Token ${token}`,
            },
        };

        try {
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                setMensagem('Professor Deletado com sucesso!')
            } else {
                setErro('Erro ao Deletar professor.')
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
                const professors = await response.json();
                setProfessorList(professors)
            } else {
                console.log('Erro ao listar professores.')
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <React.Fragment>
            <Header link={'/Home'} />
            <main id="entidades">
                <div id="menu"><Menu /></div>
                <section id="listProf">
                    <h1 id='title'>Listar Professores</h1>
                    <div className="tableList">
                        {professorList ? (
                            <><table className="professor-table">
                                <thead>
                                    <tr>
                                        <th>Nº</th>
                                        <th>Nome</th>
                                        <th>Horas Semanais</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {professorList.map((item) => (
                                        <tr key={item.id}>
                                            <td className='index'>{item.id}</td>
                                            <td>{item.nome_prof}</td>
                                            <td>{item.horas_semanais}</td>
                                            <td onClick={() => removerProfessor(item.id)} className='funcoesIndex'><AiFillDelete /></td>
                                            <td className='funcoesIndex'><MdModeEdit /></td>
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
