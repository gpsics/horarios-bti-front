import React, { useState } from 'react'
import './ListarProfessores.css'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
const ListarProfessores = ({ profs }) => {
    const [professorList, setProfessorList] = useState(profs[0]);

    const removerProfessor = (index) => {
        const novosProfs = [...professorList];
        novosProfs.splice(index, 1);
        setProfessorList(novosProfs);
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
                            <table className="professor-table">
                                <thead>
                                    <tr>
                                        <th>Nº</th>
                                        <th>Nome</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {professorList.map((item, index) => (
                                        <tr key={index}>
                                            <td className='index'>{index + 1}</td>
                                            <td>{item}</td>
                                            <td onClick={() => removerProfessor(index)} className='funcoesIndex'><AiFillDelete /></td>
                                            <td className='funcoesIndex'><MdModeEdit/></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div id='nenhumCadastro'>
                                <p>Não tem nenhum professor cadastrado.</p>
                            </div>
                        )}
                    </div>
                </section>

            </main>
            {/* <table className="professor-table">
                            <thead >
                                <tr>
                                    <th>Nº</th>
                                    <th>Nome</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>01</td>
                                    <td>LUAN ALVES DE PAIVA</td>
                                    <td><AiFillDelete /></td>
                                </tr>
                                <tr>
                                    <td>02</td>
                                    <td>ÁDLLER DE OLIVEIRA GUIMARÃES</td>
                                    <td><AiFillDelete /></td>
                                </tr>
                                <tr>
                                    <td>03</td>
                                    <td>ALVARO ALVARES DE CARVALHO CESAR SOBRINHO</td>
                                    <td><AiFillDelete /></td>
                                </tr>
                                <tr>
                                    <td>04</td>
                                    <td>ANTONIO DIEGO SILVA FARIAS</td>
                                    <td><AiFillDelete /></td>
                                </tr>
                                <tr>
                                    <td>05</td>
                                    <td>CLAUDIO ANDRES CALLEJAS OLGUIN</td>
                                    <td><AiFillDelete /></td>
                                </tr>
                                <tr>
                                    <td>06</td>
                                    <td>CLECIDA MARIA BEZERRA BESSA</td>
                                    <td><AiFillDelete /></td>
                                </tr>
                            </tbody>
                        </table> */}
            <Footer />
        </React.Fragment>
    )
}

export default ListarProfessores
