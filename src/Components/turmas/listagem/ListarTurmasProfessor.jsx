import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../../provider/authProvider'
import axios from 'axios'
import Input from '../../alerts/Inputs'
import Header from '../../header/Header'
import Menu from '../../menuLateral/Menu'
import TabelaListagem from './TabelaListagem'
import Footer from '../../footer/Footer'
import Erro from '../../alerts/Erro'

const ListarTurmasProfessor = () => {
  const [turmas, setTurmas] = useState([])
  const { token, checkTokenExpiration } = useAuth();
  const fetchTurmas = useCallback(async (docentesData) => {
    const result = await Input.selectProf(docentesData);

    if (result.isConfirmed) {
      if (result.value) {
        const url = `https://api-horarios-ufersa.tech/api/horarios/professores/${result.value}/`;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        try {
          const response = await axios.get(url, config);

          if (response.status === 200) {
            const turmasData = response.data;
            setTurmas(turmasData);
          } else {
            Error.erro('Erro ao listar turmas.');
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
  }, [token]);


  const fetchDocente = useCallback(async () => {
    const url = 'https://api-horarios-ufersa.tech/api/professores/';
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(url, config);
      if (response.status === 200) {
        const docentesData = response.data;
        fetchTurmas(docentesData);
      } else {
        console.log('Erro ao listar docentes.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }, [token, fetchTurmas]);

  useEffect(() => {
    checkTokenExpiration()
    fetchDocente();
  }, [fetchDocente, checkTokenExpiration]);
  return (
    <React.Fragment>
      <Header titulo = {'Turmas de Professor'} link={'/Home'} />
      <main id="entidades">
        <div id="menu"><Menu/> </div>
        <section className="conteudo listarTurmas">
          {/* <h1>Listar Turmas por Professor</h1> */}
          {turmas.length > 0 ? (
              <TabelaListagem tur={turmas} />
            ) : (
              <div id='nenhumaTurma'>
                <p>Não tem nenhuma turma cadastrada.</p>
              </div>
            )}
        </section>
      </main>
      <Footer/>
    </React.Fragment>
  )
}

export default ListarTurmasProfessor