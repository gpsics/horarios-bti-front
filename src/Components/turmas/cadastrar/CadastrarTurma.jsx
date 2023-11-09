import React, { useState } from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import { useNavigate } from 'react-router-dom'
import BuscarDocente from './BuscarDocente'
import './CadastrarTurma.css'
import Confirm from '../../alerts/Confirm'
import Error from '../../alerts/Error'

const CadastrarTurma = () => {
  const [codigo, setCodigo] = useState('')
  const [numTurma, setNumTurma] = useState('')
  const [numVagas, setNumVagas] = useState('')

  const navigate = useNavigate();

  const cancelar = () => {
    Confirm.cancel().then(async (result) => {
      if (result.isConfirmed) {
        navigate('/home')
      }
    })
  }
  const verificarDados = async (e) => {
    e.preventDefault()
    Confirm.cadastrar().then(async (result) => {
      if (result.isConfirmed) {
        if (codigo === '' || numTurma === '' || numVagas === '') {
          Error.erro('Preencha todas as informações!')
          return
        }
        if (codigo.length !== 7) {
          Error.erro('O código deve ter 7 caracteres!')
          return
        }
        const token = localStorage.getItem('token');
        const url = `http://127.0.0.1:8000/componentes/${codigo.toUpperCase()}`;
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Token ${token}`,
          },
        };

        try {
          const response = await fetch(url, requestOptions);
          if (response.ok) {
            navigate(`/turmas/cadastrarTurma/horarios/${codigo}/${numTurma}/${numVagas}`)
          } else {
            Error.erro('O código informado não existe!')

          }
        } catch (error) {
          console.error('An error occurred:', error);
        }

      }
    })
  }
  return (

    <React.Fragment>
      <Header link={'/Home'} />
      <main id='entidades'>
        <div id="menu">
          <Menu />
        </div>
        <section className="conteudo cadastroTurma">
          <h1>Cadastrar Turma</h1>
          <section className="cadTurma">
            <h2>Preencha o Formulário</h2>
            <form >
              <input type="text" className="informacoesTurma" placeholder='Código do Componente' value={codigo} onChange={e => setCodigo(e.target.value)} />

              <input type="text" className="informacoesTurma" placeholder='Número da turma' value={numTurma} onChange={e => setNumTurma(e.target.value)} />

              <input type="text" className="informacoesTurma" placeholder='Número de vagas' value={numVagas} onChange={e => setNumVagas(e.target.value)} />
            </form>
            <BuscarDocente />
            <div className='botaoCadTur'>
              <button onClick={cancelar} id='cancel' className="botoesCad" >Cancelar</button>
              <button id='cad' className="botoesCad" onClick={verificarDados}>Selecionar Horários</button>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default CadastrarTurma
