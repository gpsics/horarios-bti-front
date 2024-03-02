import React, { useCallback, useEffect, useState } from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import './ListarTurmas.css'
import Input from '../../alerts/Inputs';
import Erro from '../../alerts/Erro';
import { useAuth } from '../../../provider/authProvider'
import axios from 'axios'
import TabelaListagem from './TabelaListagem'
const ListarTurmasSemestre = () => {
    const [turmas, setTurmas] = useState([]);
    const { token, checkTokenExpiration } = useAuth();
   
    const fetchTurmas = useCallback(async () => {
        Input.select().then(async (result) => {
            if(result.isConfirmed) {
                if(result.value){
                    
                    const url = `https://api-horarios-ufersa.tech/api/horarios/semestre/${result.value}/`;
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    };
            
                    try {
                        const response = await axios.get(url, config);
                        if (response.status === 200) {
                            const turmasData = response.data
                            setTurmas(turmasData);
                        } else {
                            console.log('Erro ao listar turmas.')
                        }
                    } catch (error) {
                        if (error.response) {
                            // Se houver dados na resposta, exiba a mensagem para o usuário
                            Erro.erro(Object.values(error.response.data).join('\n'));
                        } else {
                            console.error('Erro na requisição:', error.message);
                            Erro.erro('Erro desconhecido');
                        }
                    }
                    
                }
            }
        })
    }, [token])

    useEffect(() => {
        checkTokenExpiration()
        fetchTurmas();
    }, [fetchTurmas, checkTokenExpiration]);
    
    return (
        <React.Fragment>
            <Header titulo = {'Turmas do Semestre'} link={'/Home'} />
            <main id="entidades">
                <div id="menu"><Menu /></div>
                <section className="conteudo listarTurmas">
                    {/* <h1>Listar Turmas</h1> */}
                    {turmas.length > 0 ? (
                        <TabelaListagem tur={turmas}/>
                    ) : (
                        <div id='nenhumaTurma'>
                            <p>Não tem nenhuma turma cadastrada.</p>
                        </div>
                    )}

                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default ListarTurmasSemestre
