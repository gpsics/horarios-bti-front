import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../provider/authProvider'
import axios from 'axios'
import Header from '../../header/Header'
import Menu from '../../menuLateral/Menu'
import DocentesTurma from './DocentesTurma'
import TabelaEditar from './TabelaEditar'
import Footer from '../../footer/Footer'
import './EditarTurma.css'

function EditarTurma() {
    const { idTurma } = useParams()
    const { token, checkTokenExpiration } = useAuth();
    const [turma, setTurma] = useState()
    const [docentesArray, setDocentesArray] = useState([])
    const [newVagas, setNewVagas] = useState(1)
    const [newNumber, setNewNumber] = useState('')


    const fetchDocente = useCallback(async (ids) => {
        try {
            const promises = ids.map(async (id) => {
                const url = `https://api-horarios-ufersa.tech/api/professores/${id}/`;
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
        const url = `https://api-horarios-ufersa.tech/api/turmas/${idTurma}`;
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
        checkTokenExpiration()
        fetchTurmas();
    }, [fetchTurmas, checkTokenExpiration]);


    return (
        <React.Fragment>
            <Header titulo={'Editar Turma'} link={'/home'} />
            <main id="entidades">
                <div id="menu">
                    <Menu />
                </div>
                <section className="conteudo editarTurma">
                    <section className="edTur">
                        <div className="header-section">
                            <h2>Preencha as Informações</h2>
                            <p>Forneça as credenciais necessárias para editar esta turma.</p>
                            <p>Nota: Não é permitido incluir caracteres especiais nos campos, ou deixar alguma informação em branco.</p>
                            <p>Nota: No horário que tiver X, significa que o horário está ocupado e que se for marcado, pode gerar um conflíto.</p>
                        </div>
                        <form>
                            <div>
                                <label><p>Número de Vagas *</p><input type="number" placeholder="Número de Vagas" value={newVagas} onChange={e => setNewVagas(e.target.value)} /> </label>
                                <label ><p>Número da Turma *</p><input type="number" min={1} placeholder="Número da Turma" value={newNumber} onChange={e => setNewNumber(e.target.value)} /> </label>
                            </div>
                            <DocentesTurma profs={docentesArray} />
                        </form>
                    </section>
                    <TabelaEditar tur={turma} numVagas={newVagas} numTurma={newNumber} />
                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default EditarTurma
