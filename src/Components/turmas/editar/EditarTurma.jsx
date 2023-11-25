import React, { useCallback, useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { useAuth } from '../../../provider/authProvider'
import axios from 'axios'
import Header from '../../header/Header'
import Menu from '../../menuLateral/Menu'
import DocentesTurma from './DocentesTurma'
import TabelaEditar from './TabelaEditar'
import Footer from '../../footer/Footer'

function EditarTurma() {
    const { idTurma } = useParams()
    const { token } = useAuth()
    const [turma, setTurma] = useState()
    const [docentesArray, setDocentesArray] = useState([])
    const [newVagas, setNewVagas] = useState('')
    const [newNumber, setNewNumber] = useState('')


    const fetchDocente = useCallback(async (ids) => {
        try {
            const promises = ids.map(async (id) => {
                const url = `http://127.0.0.1:8000/api/professores/${id}/`;
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get(url, config);
                if (response.status === 200) {
                    return response.data;
                } else {
                    console.error(`Error fetching professor ${id}:`, response);
                }
            });

            return Promise.all(promises);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }, [token])
    const fetchTurmas = useCallback(async () => {
        const url = `http://127.0.0.1:8000/api/turmas/${idTurma}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = await axios.get(url, config);
            if (response.status === 200) {
                const turmasData = response.data;
                setNewVagas(turmasData.num_vagas)
                setNewNumber(turmasData.num_turma)
                const docentesData = await fetchDocente(turmasData.professor);
                setDocentesArray(docentesData);
                setTurma(turmasData);
            } else {
                console.log('Erro ao listar turmas.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }, [idTurma, token, fetchDocente]);

    useEffect(() => {
        fetchTurmas();
    }, [fetchTurmas]);


    return (
        <React.Fragment>
            <Header titulo = {'Editar Turma'} link={'/home'} />
            <main id="entidades">
                <div id="menu">
                    <Menu />
                </div>
                <section className="conteudo editarTurma">
                    {/* <h1>Formulário de Edição</h1> */}
                    <section className="edTur">
                        <form>
                            <input type="text" placeholder="Número de Vagas" value={newVagas} onChange={e => setNewVagas(e.target.value) } />
                            <input type="text" placeholder="Número da Turma" value={newNumber} onChange={e => setNewNumber(e.target.value) } />
                            <DocentesTurma profs={docentesArray} />
                            <TabelaEditar tur={turma} numvagas={newVagas} numTurma={newNumber} />
                        </form>
                    </section>
                </section>
            </main>
            <Footer/>
        </React.Fragment>
    )
}

export default EditarTurma
