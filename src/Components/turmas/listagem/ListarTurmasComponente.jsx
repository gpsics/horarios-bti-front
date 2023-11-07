import React, { useEffect, useState } from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import './ListarTurmas.css'
import Input from '../../alerts/Inputs';
import Error from '../../alerts/Error';
const ListarTurmasComponente = () => {
  const [turmas, setTurmas] = useState([]);
  const [turmasSemestre, setTurmasSemestre] = useState([])
  console.log(turmasSemestre)

  useEffect(() => {
    fetchTurmas();
  }, []);

  const fetchTurmas = async () => {
    Input.text().then(async (result) => {
      if (result.isConfirmed) {
        if (result.value) {
          console.log(`Código: ${result.value.toUpperCase()}`)
          const token = localStorage.getItem('token');
          const url = 'http://127.0.0.1:8000/turmas/';
          const requestOptions = {
            method: 'GET',
            headers: {
              Authorization: `Token ${token}`,
            },
          };

          try {
            const response = await fetch(url, requestOptions);
            if (response.ok) {
              const turmasData = await response.json();
              setTurmas(turmasData);
              setTurmasSemestre(turmasData)
            } else {
              Error.erro('Erro ao listar turmas.')
            }
          } catch (error) {
            console.error('An error occurred:', error);
          }

        }
      }
    })
  };
  return (
    <React.Fragment>
      <Header link={'/Home'} />
      <main id="entidades">
        <div className="menu"><Menu /></div>
        <section className="conteudo listarTurmas">
          <h1>Listar Turmas</h1>
          {turmas.length > 0 ? (
            <>


            </>
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
