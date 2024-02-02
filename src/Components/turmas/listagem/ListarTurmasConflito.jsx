import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../../provider/authProvider';
import { Link } from 'react-router-dom';
import Header from '../../header/Header';
import Menu from '../../menuLateral/Menu';
import Footer from '../../footer/Footer';
import './ListarConflitos.css'

const ListarTurmasConflito = () => {
  const [conflitos, setConflitos] = useState([]);
  const { token, checkTokenExpiration } = useAuth();
  const fetchConflitos = useCallback(async () => {
    const url = 'http://3.221.150.138:8000/api/horarios/conflitos/';
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(url, config);
      if (response.status === 200) {
        const professorsData = response.data
        setConflitos(professorsData);
      } else {
        console.log('Erro ao listar professores.')
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }, [token]);

  useEffect(() => {
    checkTokenExpiration()
    fetchConflitos();
  }, [fetchConflitos, checkTokenExpiration]);
  return (
    <React.Fragment>
      <Header titulo = {'Turmas com Conflito'} link={'/home'} />
      <main id="entidades">
        <div id="menu"><Menu /> </div>
        <section className='conteudo listarTurmasConflitantes'>
          {/* <h1>Turmas com Conflíto</h1> */}
          {conflitos.length > 0 ? (
            <ul className='listarConflitos'>
              {conflitos.map((item, index) => (
                <li key={index} >
                  <Link to={`/componentes/verDadosComponente/${item.turma1.cod_componente}`}>
                    {item.turma1.cod_componente}
                  </Link> - <Link to={`/turmas/verDadosTurma/${item.turma1.id }`}>
                     T0{item.turma1.num_turma}
                  </Link> X <Link to={`/componentes/verDadosComponente/${item.turma2.cod_componente}`}>
                    {item.turma2.cod_componente}
                  </Link> - <Link to={`/turmas/verDadosTurma/${item.turma2.id }`}>
                     T0{item.turma2.num_turma}
                  </Link> | Horário: <span>{item.horario}</span> | Motivo: <span>{item.conflito}</span>
                </li>

              ))}
            </ul>
          ) : (
            <div id='nenhumaTurma'>
              <p>Não tem nenhum conflito de horários.</p>
            </div>
          )}
        </section>
      </main >
      <Footer />
    </React.Fragment >
  )
}

export default ListarTurmasConflito
