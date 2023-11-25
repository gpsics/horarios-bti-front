import React, { useCallback, useEffect, useState } from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import './ListarTurmas.css'
import Input from '../../alerts/Inputs';
import Erro from '../../alerts/Erro';
import axios from 'axios'
import { useAuth } from '../../../provider/authProvider'
import TabelaListagem from './TabelaListagem'
const ListarTurmasComponente = () => {
  const [turmas, setTurmas] = useState([]);
  const { token } = useAuth()

  const fetchTurmas = useCallback(async () => {
    Input.text().then(async (result) => {
      if (result.isConfirmed) {
        if (result.value) {
          const url = `http://127.0.0.1:8000/api/horarios/componentes/${result.value.toUpperCase()}/`;
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
              Erro.erro('Erro ao listar turmas.')
            }
          } catch (error) {
            Erro.erro("Erro ao listar turmas.")
            console.error('An error occurred:', error);
          }

        }

      }
    })
  }, [token])

  useEffect(() => {
    fetchTurmas();
  }, [fetchTurmas]);
  return (
    <React.Fragment>
      <Header titulo = {'Turmas de Componente'} link={'/Home'} />
      <main id="entidades">
        <div className="menu"><Menu /></div>
        <section className="conteudo listarTurmas">
          {/* <h1>Listar Turmas</h1> */}
          {turmas.length > 0 ? (
            <TabelaListagem tur={turmas} />
          ) : (
            <div id='nenhumCOMP'>
              <p>Não tem nenhuma turma cadastrada.</p>
            </div>
          )}

        </section>
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default ListarTurmasComponente