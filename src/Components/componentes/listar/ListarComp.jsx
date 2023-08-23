import React, { useEffect, useState } from 'react'
import './ListarComp.css'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { GrView } from "react-icons/gr";
//import { useNavigate } from 'react-router-dom'

const ListarComponentes = () => {
    const [erro, setErro] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [componentes, setComponentes] = useState([]);
    //const navigate = useNavigate();

    const removerComponente = async (id) => {
        setErro('')
        setMensagem('')
        const token = localStorage.getItem('token');
        const url = `http://127.0.0.1:8000/componentes/${id}/`;
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Token ${token}`,
            },
        };

        try {
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                setMensagem('Componente Deletado com sucesso!');
                // Atualizar o estado removendo o professor da lista
                setComponentes(prevComponentes => prevComponentes.filter(comp => comp.id !== id));
            } else {
                setErro('Erro ao Deletar Componente.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    useEffect(() => {
        fetchComponente();
    }, []);

    const fetchComponente = async () => {
        setErro('')
        setMensagem('')
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
            } else {
                console.log('Erro ao listar componentes.')
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    // const editarComponente = (item) =>{
    //     profEdit(item)
    //     navigate("/professores/editarProfessor");
    // }
    return (
        <React.Fragment>
            <Header link={'/Home'} />
            <main id="entidades">
                <div id="menu"><Menu /></div>
                <section id="listComp">
                    <h1 id='title'>Listar Componentes</h1>
                    <div className="tableList">
                        {componentes.length > 0 ? (
                            <><table className="componente-table">
                                <thead>
                                    <tr>
                                        <th>Nº</th>
                                        <th>Código</th>
                                        <th>Componente</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {componentes.map((item) => (
                                        <tr key={item.id}>
                                            <td className='index'>{item.id}</td>
                                            <td>{item.nome}</td>
                                            <td>{item.codigo} Hrs</td>
                                            <td className='funcoesIndex'><GrView/></td>
                                            <td className='funcoesIndex'><MdModeEdit /></td>
                                            <td onClick={() => removerComponente(item.id)} className='funcoesIndex'><AiFillDelete /></td>
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
                                <p>Não tem nenhum componente cadastrado.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default ListarComponentes