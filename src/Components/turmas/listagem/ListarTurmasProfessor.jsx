import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../../provider/authProvider'
import axios from 'axios'
import Input from '../../alerts/Inputs'
import Header from '../../header/Header'
import Menu from '../../menuLateral/Menu'
import TabelaListagem from './TabelaListagem'
import Footer from '../../footer/Footer'

const ListarTurmasProfessor = () => {
  const [turmas, setTurmas] = useState([])
  const { token } = useAuth()

  const fetchTurmas = useCallback(async (docentesData) => {
    const result = await Input.selectProf(docentesData);

    if (result.isConfirmed) {
      if (result.value) {
        const url = `http://127.0.0.1:8000/api/horarios/professores/${result.value}/`;
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
          Error.erro('Erro ao listar turmas.');
          console.error('An error occurred:', error);
        }
      }
    }
  }, [token]);


  const fetchDocente = useCallback(async () => {
    const url = 'http://127.0.0.1:8000/api/professores/';
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
    fetchDocente();
  }, [fetchDocente]);
  return (
    <React.Fragment>
      <Header link={'/Home'} />
      <main id="entidades">
        <div className="menu"><Menu/> </div>
        <section className="conteudo listarTurmas">
          <h1>Listar Turmas por Professor</h1>
          {turmas.length > 0 ? (
              <TabelaListagem tur={turmas} />
            ) : (
              <div id='nenhumCOMP'>
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